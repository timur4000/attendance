#!/usr/bin/env python3
"""
Скрипт для экспорта объектов базы данных PostgreSQL в отдельные файлы
Каждый объект экспортируется в виде валидного DDL кода
"""

import os
import sys
import argparse
import psycopg2
import psycopg2.extras
from datetime import datetime
import json
import logging
from pathlib import Path
import re
from typing import Dict, List, Tuple, Optional

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class PostgreSQLDumper:
    """Класс для экспорта объектов PostgreSQL в отдельные файлы"""
    
    def __init__(self, connection_params: Dict[str, str], export_dir: str = "./database_export"):
        self.connection_params = connection_params
        self.export_dir = Path(export_dir)
        self.conn = None
        self.cursor = None
        self.stats = {}
        
    def connect(self):
        """Подключение к базе данных"""
        try:
            self.conn = psycopg2.connect(**self.connection_params)
            self.cursor = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            logger.info(f"Подключено к базе данных {self.connection_params['database']}")
        except psycopg2.Error as e:
            logger.error(f"Ошибка подключения к базе данных: {e}")
            sys.exit(1)
            
    def disconnect(self):
        """Отключение от базы данных"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
        logger.info("Отключено от базы данных")
        
    def create_directories(self):
        """Создание структуры директорий для экспорта"""
        directories = [
            'schemas', 'tables', 'views', 'functions', 'procedures',
            'sequences', 'types', 'triggers', 'indexes', 'constraints',
            'extensions', 'rules', 'policies'
        ]
        
        for dir_name in directories:
            (self.export_dir / dir_name).mkdir(parents=True, exist_ok=True)
        
        # Создаем файл с информацией об экспорте
        export_info = {
            'database': self.connection_params['database'],
            'host': f"{self.connection_params.get('host', 'localhost')}:{self.connection_params.get('port', 5432)}",
            'user': self.connection_params['user'],
            'export_date': datetime.now().isoformat(),
            'postgresql_version': self.get_postgresql_version()
        }
        
        with open(self.export_dir / 'export_info.json', 'w', encoding='utf-8') as f:
            json.dump(export_info, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Создана структура директорий в {self.export_dir}")
        
    def get_postgresql_version(self) -> str:
        """Получение версии PostgreSQL"""
        self.cursor.execute("SELECT version()")
        return self.cursor.fetchone()[0]
        
    def safe_filename(self, name: str) -> str:
        """Преобразование имени в безопасное для файловой системы"""
        # Заменяем недопустимые символы
        name = re.sub(r'[<>:"/\\|?*]', '_', name)
        # Ограничиваем длину имени
        if len(name) > 200:
            name = name[:200]
        return name
        
    def export_schemas(self):
        """Экспорт схем"""
        logger.info("Экспорт схем...")
        
        query = """
        SELECT schema_name 
        FROM information_schema.schemata 
        WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY schema_name
        """
        
        self.cursor.execute(query)
        schemas = self.cursor.fetchall()
        
        count = 0
        for row in schemas:
            schema_name = row['schema_name']
            logger.info(f"  Экспорт схемы: {schema_name}")
            
            ddl = f'CREATE SCHEMA IF NOT EXISTS "{schema_name}";\n'
            
            # Добавляем комментарий к схеме, если есть
            self.cursor.execute("""
                SELECT obj_description(n.oid, 'pg_namespace') as comment
                FROM pg_namespace n
                WHERE n.nspname = %s
            """, (schema_name,))
            
            comment_row = self.cursor.fetchone()
            if comment_row and comment_row['comment']:
                ddl += f"\nCOMMENT ON SCHEMA \"{schema_name}\" IS '{comment_row['comment']}';\n"
            
            filepath = self.export_dir / 'schemas' / f"{self.safe_filename(schema_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['schemas'] = count
        logger.info(f"Экспортировано схем: {count}")
        
    def export_tables(self):
        """Экспорт таблиц"""
        logger.info("Экспорт таблиц...")
        
        query = """
        SELECT 
            t.schemaname,
            t.tablename,
            obj_description(c.oid, 'pg_class') as table_comment
        FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        JOIN pg_namespace n ON n.nspname = t.schemaname AND n.oid = c.relnamespace
        WHERE t.schemaname NOT IN ('pg_catalog', 'information_schema')
        ORDER BY t.schemaname, t.tablename
        """
        
        self.cursor.execute(query)
        tables = self.cursor.fetchall()
        
        count = 0
        for row in tables:
            schema_name = row['schemaname']
            table_name = row['tablename']
            table_comment = row['table_comment']
            
            logger.info(f"  Экспорт таблицы: {schema_name}.{table_name}")
            
            # Создаем директорию для схемы
            schema_dir = self.export_dir / 'tables' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            # Получаем DDL таблицы
            ddl = self.get_table_ddl(schema_name, table_name)
            
            # Добавляем комментарий к таблице
            if table_comment:
                ddl += f"\n\nCOMMENT ON TABLE \"{schema_name}\".\"{table_name}\" IS '{table_comment}';"
            
            # Добавляем комментарии к колонкам
            column_comments = self.get_column_comments(schema_name, table_name)
            for col_name, col_comment in column_comments:
                ddl += f"\nCOMMENT ON COLUMN \"{schema_name}\".\"{table_name}\".\"{col_name}\" IS '{col_comment}';"
            
            filepath = schema_dir / f"{self.safe_filename(table_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['tables'] = count
        logger.info(f"Экспортировано таблиц: {count}")
        
    def get_table_ddl(self, schema_name: str, table_name: str) -> str:
        """Получение DDL таблицы"""
        ddl_parts = []
        
        # Получаем определение колонок
        query = """
        SELECT 
            a.attname as column_name,
            pg_catalog.format_type(a.atttypid, a.atttypmod) as data_type,
            a.attnotnull as not_null,
            pg_get_expr(d.adbin, d.adrelid) as default_value,
            a.attidentity as identity_type,
            a.attgenerated as generated_type
        FROM pg_attribute a
        LEFT JOIN pg_attrdef d ON a.attrelid = d.adrelid AND a.attnum = d.adnum
        WHERE a.attrelid = %s::regclass
          AND a.attnum > 0
          AND NOT a.attisdropped
        ORDER BY a.attnum
        """
        
        self.cursor.execute(query, (f'"{schema_name}"."{table_name}"',))
        columns = self.cursor.fetchall()
        
        column_defs = []
        for col in columns:
            col_def = f'    "{col["column_name"]}" {col["data_type"]}'
            
            # GENERATED колонки
            if col['generated_type'] == 's':  # STORED
                col_def += f" GENERATED ALWAYS AS ({col['default_value']}) STORED"
            elif col['identity_type'] != '\x00':  # IDENTITY колонка
                if col['identity_type'] == 'd':
                    col_def += " GENERATED BY DEFAULT AS IDENTITY"
                elif col['identity_type'] == 'a':
                    col_def += " GENERATED ALWAYS AS IDENTITY"
            elif col['default_value']:
                col_def += f" DEFAULT {col['default_value']}"
                
            if col['not_null']:
                col_def += " NOT NULL"
                
            column_defs.append(col_def)
        
        # Получаем ограничения
        constraints = self.get_table_constraints(schema_name, table_name)
        
        # Формируем DDL
        ddl = f'CREATE TABLE "{schema_name}"."{table_name}" (\n'
        ddl += ',\n'.join(column_defs)
        
        if constraints:
            ddl += ',\n' + ',\n'.join(constraints)
            
        ddl += '\n);\n'
        
        return ddl
        
    def get_table_constraints(self, schema_name: str, table_name: str) -> List[str]:
        """Получение ограничений таблицы"""
        query = """
        SELECT 
            con.conname as constraint_name,
            con.contype as constraint_type,
            pg_get_constraintdef(con.oid) as definition
        FROM pg_constraint con
        JOIN pg_class c ON c.oid = con.conrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = %s AND c.relname = %s
        ORDER BY 
            CASE con.contype
                WHEN 'p' THEN 1
                WHEN 'u' THEN 2
                WHEN 'f' THEN 3
                WHEN 'c' THEN 4
                ELSE 5
            END,
            con.conname
        """
        
        self.cursor.execute(query, (schema_name, table_name))
        constraints = self.cursor.fetchall()
        
        constraint_defs = []
        for con in constraints:
            constraint_defs.append(f'    CONSTRAINT "{con["constraint_name"]}" {con["definition"]}')
            
        return constraint_defs
        
    def get_column_comments(self, schema_name: str, table_name: str) -> List[Tuple[str, str]]:
        """Получение комментариев к колонкам"""
        query = """
        SELECT 
            a.attname as column_name,
            col_description(c.oid, a.attnum) as comment
        FROM pg_attribute a
        JOIN pg_class c ON c.oid = a.attrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = %s 
          AND c.relname = %s
          AND a.attnum > 0
          AND NOT a.attisdropped
          AND col_description(c.oid, a.attnum) IS NOT NULL
        """
        
        self.cursor.execute(query, (schema_name, table_name))
        return [(row['column_name'], row['comment']) for row in self.cursor.fetchall()]
        
    def export_views(self):
        """Экспорт представлений"""
        logger.info("Экспорт представлений...")
        
        query = """
        SELECT 
            n.nspname as schemaname,
            c.relname as viewname,
            pg_get_viewdef(c.oid, true) as definition,
            obj_description(c.oid, 'pg_class') as comment
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relkind = 'v'
          AND n.nspname NOT IN ('pg_catalog', 'information_schema')
        ORDER BY n.nspname, c.relname
        """
        
        self.cursor.execute(query)
        views = self.cursor.fetchall()
        
        count = 0
        for row in views:
            schema_name = row['schemaname']
            view_name = row['viewname']
            view_def = row['definition']
            comment = row['comment']
            
            logger.info(f"  Экспорт представления: {schema_name}.{view_name}")
            
            schema_dir = self.export_dir / 'views' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            ddl = f'CREATE OR REPLACE VIEW "{schema_name}"."{view_name}" AS\n{view_def};\n'
            
            if comment:
                ddl += f'\nCOMMENT ON VIEW "{schema_name}"."{view_name}" IS \'{comment}\';\n'
            
            filepath = schema_dir / f"{self.safe_filename(view_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['views'] = count
        logger.info(f"Экспортировано представлений: {count}")
        
    def export_functions(self):
        """Экспорт функций и процедур"""
        logger.info("Экспорт функций и процедур...")
        
        # Запрос для PostgreSQL 11+
        query = """
        SELECT 
            n.nspname as schema_name,
            p.proname as routine_name,
            p.oid::regprocedure::text as signature,
            CASE p.prokind 
                WHEN 'f' THEN 'FUNCTION'
                WHEN 'p' THEN 'PROCEDURE'
                WHEN 'a' THEN 'AGGREGATE'
                WHEN 'w' THEN 'WINDOW'
            END as routine_type,
            pg_get_functiondef(p.oid) as definition,
            obj_description(p.oid, 'pg_proc') as comment
        FROM pg_proc p
        LEFT JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        ORDER BY n.nspname, p.proname
        """
        
        try:
            self.cursor.execute(query)
        except psycopg2.Error:
            # Для PostgreSQL < 11
            query = """
            SELECT 
                n.nspname as schema_name,
                p.proname as routine_name,
                p.oid::regprocedure::text as signature,
                CASE 
                    WHEN p.proisagg THEN 'AGGREGATE'
                    WHEN p.proiswindow THEN 'WINDOW'
                    ELSE 'FUNCTION'
                END as routine_type,
                pg_get_functiondef(p.oid) as definition,
                obj_description(p.oid, 'pg_proc') as comment
            FROM pg_proc p
            LEFT JOIN pg_namespace n ON n.oid = p.pronamespace
            WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
            ORDER BY n.nspname, p.proname
            """
            self.cursor.execute(query)
        
        routines = self.cursor.fetchall()
        
        func_count = 0
        proc_count = 0
        
        for row in routines:
            schema_name = row['schema_name']
            routine_name = row['routine_name']
            routine_type = row['routine_type']
            definition = row['definition']
            comment = row['comment']
            signature = row['signature']
            
            logger.info(f"  Экспорт {routine_type}: {signature}")
            
            # Определяем директорию
            if routine_type == 'PROCEDURE':
                dir_name = 'procedures'
                proc_count += 1
            else:
                dir_name = 'functions'
                func_count += 1
            
            schema_dir = self.export_dir / dir_name / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            ddl = definition + ';\n'
            
            if comment:
                ddl += f"\nCOMMENT ON {routine_type} {signature} IS '{comment}';\n"
            
            # Формируем имя файла из имени функции и аргументов
            safe_name = self.safe_filename(signature.replace('"', '').replace('.', '_'))
            filepath = schema_dir / f"{safe_name}.sql"
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
        
        self.stats['functions'] = func_count
        self.stats['procedures'] = proc_count
        logger.info(f"Экспортировано функций: {func_count}, процедур: {proc_count}")
        
    def export_sequences(self):
        """Экспорт последовательностей"""
        logger.info("Экспорт последовательностей...")
        
        query = """
        SELECT 
            schemaname,
            sequencename,
            start_value,
            min_value,
            max_value,
            increment_by,
            cycle
        FROM pg_sequences
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
        ORDER BY schemaname, sequencename
        """
        
        self.cursor.execute(query)
        sequences = self.cursor.fetchall()
        
        count = 0
        for row in sequences:
            schema_name = row['schemaname']
            sequence_name = row['sequencename']
            
            logger.info(f"  Экспорт последовательности: {schema_name}.{sequence_name}")
            
            schema_dir = self.export_dir / 'sequences' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            ddl = f'CREATE SEQUENCE "{schema_name}"."{sequence_name}"\n'
            ddl += f'    START WITH {row["start_value"]}\n'
            ddl += f'    INCREMENT BY {row["increment_by"]}\n'
            ddl += f'    MINVALUE {row["min_value"]}\n'
            ddl += f'    MAXVALUE {row["max_value"]}\n'
            ddl += f'    {"CYCLE" if row["cycle"] else "NO CYCLE"};\n'
            
            # Получаем комментарий
            self.cursor.execute("""
                SELECT obj_description(c.oid, 'pg_class') as comment
                FROM pg_class c
                JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE n.nspname = %s AND c.relname = %s
            """, (schema_name, sequence_name))
            
            comment_row = self.cursor.fetchone()
            if comment_row and comment_row['comment']:
                ddl += f'\nCOMMENT ON SEQUENCE "{schema_name}"."{sequence_name}" IS \'{comment_row["comment"]}\';\n'
            
            filepath = schema_dir / f"{self.safe_filename(sequence_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['sequences'] = count
        logger.info(f"Экспортировано последовательностей: {count}")
        
    def export_types(self):
        """Экспорт пользовательских типов"""
        logger.info("Экспорт пользовательских типов...")
        
        query = """
        SELECT 
            n.nspname as schema_name,
            t.typname as type_name,
            t.typtype as type_type,
            obj_description(t.oid, 'pg_type') as comment
        FROM pg_type t
        LEFT JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
          AND t.typtype IN ('c', 'e', 'd')
        ORDER BY n.nspname, t.typname
        """
        
        self.cursor.execute(query)
        types = self.cursor.fetchall()
        
        count = 0
        for row in types:
            schema_name = row['schema_name']
            type_name = row['type_name']
            type_type = row['type_type']
            comment = row['comment']
            
            logger.info(f"  Экспорт типа: {schema_name}.{type_name}")
            
            schema_dir = self.export_dir / 'types' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            if type_type == 'e':  # ENUM
                ddl = self.get_enum_ddl(schema_name, type_name)
            elif type_type == 'c':  # Composite
                ddl = self.get_composite_type_ddl(schema_name, type_name)
            elif type_type == 'd':  # Domain
                ddl = self.get_domain_ddl(schema_name, type_name)
            else:
                continue
            
            if comment:
                ddl += f'\nCOMMENT ON TYPE "{schema_name}"."{type_name}" IS \'{comment}\';\n'
            
            filepath = schema_dir / f"{self.safe_filename(type_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['types'] = count
        logger.info(f"Экспортировано типов: {count}")
        
    def get_enum_ddl(self, schema_name: str, type_name: str) -> str:
        """Получение DDL для ENUM типа"""
        query = """
        SELECT string_agg(quote_literal(enumlabel), ', ' ORDER BY enumsortorder) as labels
        FROM pg_enum e
        JOIN pg_type t ON t.oid = e.enumtypid
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = %s AND t.typname = %s
        """
        
        self.cursor.execute(query, (schema_name, type_name))
        result = self.cursor.fetchone()
        
        return f'CREATE TYPE "{schema_name}"."{type_name}" AS ENUM ({result["labels"]});\n'
        
    def get_composite_type_ddl(self, schema_name: str, type_name: str) -> str:
        """Получение DDL для композитного типа"""
        query = """
        SELECT string_agg(
            quote_ident(attname) || ' ' || 
            pg_catalog.format_type(atttypid, atttypmod),
            ', ' ORDER BY attnum) as attributes
        FROM pg_attribute a
        JOIN pg_class c ON c.oid = a.attrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = %s 
          AND c.relname = %s
          AND a.attnum > 0
          AND NOT a.attisdropped
        """
        
        self.cursor.execute(query, (schema_name, type_name))
        result = self.cursor.fetchone()
        
        return f'CREATE TYPE "{schema_name}"."{type_name}" AS ({result["attributes"]});\n'
        
    def get_domain_ddl(self, schema_name: str, type_name: str) -> str:
        """Получение DDL для домена"""
        query = """
        SELECT 
            pg_catalog.format_type(t.typbasetype, t.typtypmod) as base_type,
            t.typnotnull as not_null,
            t.typdefault as default_value,
            array_agg(pg_get_constraintdef(c.oid) ORDER BY c.conname) as constraints
        FROM pg_type t
        LEFT JOIN pg_constraint c ON c.contypid = t.oid
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = %s AND t.typname = %s
        GROUP BY t.oid, t.typbasetype, t.typtypmod, t.typnotnull, t.typdefault
        """
        
        self.cursor.execute(query, (schema_name, type_name))
        result = self.cursor.fetchone()
        
        ddl = f'CREATE DOMAIN "{schema_name}"."{type_name}" AS {result["base_type"]}'
        
        if result['default_value']:
            ddl += f' DEFAULT {result["default_value"]}'
            
        if result['not_null']:
            ddl += ' NOT NULL'
            
        if result['constraints'] and result['constraints'][0]:
            for constraint in result['constraints']:
                ddl += f'\n    {constraint}'
                
        ddl += ';\n'
        
        return ddl
        
    def export_triggers(self):
        """Экспорт триггеров"""
        logger.info("Экспорт триггеров...")
        
        query = """
        SELECT 
            n.nspname as schema_name,
            c.relname as table_name,
            t.tgname as trigger_name,
            pg_get_triggerdef(t.oid) as definition,
            obj_description(t.oid, 'pg_trigger') as comment
        FROM pg_trigger t
        JOIN pg_class c ON c.oid = t.tgrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
          AND NOT t.tgisinternal
        ORDER BY n.nspname, c.relname, t.tgname
        """
        
        self.cursor.execute(query)
        triggers = self.cursor.fetchall()
        
        count = 0
        for row in triggers:
            schema_name = row['schema_name']
            table_name = row['table_name']
            trigger_name = row['trigger_name']
            definition = row['definition']
            comment = row['comment']
            
            logger.info(f"  Экспорт триггера: {schema_name}.{table_name}.{trigger_name}")
            
            schema_dir = self.export_dir / 'triggers' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            ddl = definition + ';\n'
            
            if comment:
                ddl += f'\nCOMMENT ON TRIGGER "{trigger_name}" ON "{schema_name}"."{table_name}" IS \'{comment}\';\n'
            
            filename = f"{self.safe_filename(table_name)}_{self.safe_filename(trigger_name)}.sql"
            filepath = schema_dir / filename
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['triggers'] = count
        logger.info(f"Экспортировано триггеров: {count}")
        
    def export_indexes(self):
        """Экспорт индексов"""
        logger.info("Экспорт индексов...")
        
        query = """
        SELECT 
            n.nspname as schema_name,
            c.relname as table_name,
            i.relname as index_name,
            pg_get_indexdef(idx.indexrelid) as definition,
            obj_description(i.oid, 'pg_class') as comment
        FROM pg_index idx
        JOIN pg_class i ON i.oid = idx.indexrelid
        JOIN pg_class c ON c.oid = idx.indrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
          AND NOT idx.indisprimary
        ORDER BY n.nspname, c.relname, i.relname
        """
        
        self.cursor.execute(query)
        indexes = self.cursor.fetchall()
        
        count = 0
        for row in indexes:
            schema_name = row['schema_name']
            table_name = row['table_name']
            index_name = row['index_name']
            definition = row['definition']
            comment = row['comment']
            
            logger.info(f"  Экспорт индекса: {schema_name}.{table_name}.{index_name}")
            
            schema_dir = self.export_dir / 'indexes' / self.safe_filename(schema_name)
            schema_dir.mkdir(exist_ok=True)
            
            ddl = definition + ';\n'
            
            if comment:
                ddl += f'\nCOMMENT ON INDEX "{schema_name}"."{index_name}" IS \'{comment}\';\n'
            
            filename = f"{self.safe_filename(table_name)}_{self.safe_filename(index_name)}.sql"
            filepath = schema_dir / filename
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['indexes'] = count
        logger.info(f"Экспортировано индексов: {count}")
        
    def export_extensions(self):
        """Экспорт расширений"""
        logger.info("Экспорт расширений...")
        
        query = """
        SELECT 
            e.extname as name,
            e.extversion as version,
            n.nspname as schema,
            e.extconfig::text as config,
            obj_description(e.oid, 'pg_extension') as comment
        FROM pg_extension e
        JOIN pg_namespace n ON n.oid = e.extnamespace
        WHERE e.extname NOT IN ('plpgsql')
        ORDER BY e.extname
        """
        
        self.cursor.execute(query)
        extensions = self.cursor.fetchall()
        
        count = 0
        for row in extensions:
            ext_name = row['name']
            version = row['version']
            schema = row['schema']
            comment = row['comment']
            
            logger.info(f"  Экспорт расширения: {ext_name}")
            
            ddl = f'CREATE EXTENSION IF NOT EXISTS "{ext_name}"'
            
            if schema != 'public':
                ddl += f' SCHEMA "{schema}"'
                
            if version:
                ddl += f' VERSION \'{version}\''
                
            ddl += ';\n'
            
            if comment:
                ddl += f'\nCOMMENT ON EXTENSION "{ext_name}" IS \'{comment}\';\n'
            
            filepath = self.export_dir / 'extensions' / f"{self.safe_filename(ext_name)}.sql"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(ddl)
            
            count += 1
            
        self.stats['extensions'] = count
        logger.info(f"Экспортировано расширений: {count}")
        
    def create_summary(self):
        """Создание сводного отчета об экспорте"""
        logger.info("Создание сводного отчета...")
        
        summary = f"""# Экспорт базы данных {self.connection_params['database']}

## Информация об экспорте

- **Дата экспорта**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **Хост**: {self.connection_params.get('host', 'localhost')}:{self.connection_params.get('port', 5432)}
- **Пользователь**: {self.connection_params['user']}
- **Версия PostgreSQL**: {self.get_postgresql_version().split(',')[0]}

## Структура экспорта

- `schemas/` - определения схем
- `tables/` - определения таблиц  
- `views/` - определения представлений
- `functions/` - определения функций
- `procedures/` - определения процедур
- `sequences/` - определения последовательностей
- `types/` - определения пользовательских типов
- `triggers/` - определения триггеров
- `indexes/` - определения индексов
- `extensions/` - определения расширений

## Статистика экспорта

| Тип объекта | Количество |
|-------------|------------|
"""
        
        # Добавляем статистику
        total = 0
        for obj_type, count in sorted(self.stats.items()):
            summary += f"| {obj_type.capitalize()} | {count} |\n"
            total += count
            
        summary += f"| **Всего** | **{total}** |\n"
        
        summary += """
## Использование

### Восстановление всей базы данных

```bash
# Создайте новую базу данных
createdb -U postgres newdb

# Восстановите объекты в правильном порядке
for dir in extensions schemas types sequences tables views functions procedures triggers indexes; do
    find ./database_export/$dir -name "*.sql" -exec psql -U postgres -d newdb -f {} \\;
done
```

### Восстановление отдельных объектов

```bash
# Восстановить конкретную таблицу
psql -U postgres -d mydb -f ./database_export/tables/public/my_table.sql

# Восстановить все функции схемы
psql -U postgres -d mydb -f ./database_export/functions/my_schema/*.sql
```

## Примечания

- Скрипт экспортирует только структуру базы данных (DDL), без данных
- Права доступа (GRANT/REVOKE) не экспортируются
- Владельцы объектов не сохраняются
- Для полного бэкапа используйте pg_dump с соответствующими параметрами
"""
        
        with open(self.export_dir / 'README.md', 'w', encoding='utf-8') as f:
            f.write(summary)
            
        logger.info("Сводный отчет создан")
        
    def export_all(self):
        """Выполнить полный экспорт всех объектов"""
        try:
            self.connect()
            self.create_directories()
            
            # Экспортируем объекты в правильном порядке
            self.export_extensions()
            self.export_schemas()
            self.export_types()
            self.export_sequences()
            self.export_tables()
            self.export_views()
            self.export_functions()
            self.export_triggers()
            self.export_indexes()
            
            self.create_summary()
            
            logger.info(f"Экспорт завершен успешно! Результаты в: {self.export_dir}")
            
        except Exception as e:
            logger.error(f"Ошибка при экспорте: {e}")
            raise
        finally:
            self.disconnect()


def main():
    """Главная функция"""
    parser = argparse.ArgumentParser(
        description='Экспорт объектов PostgreSQL в отдельные файлы',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Примеры использования:

  # Базовый экспорт
  %(prog)s -d mydb -U myuser

  # С указанием хоста и порта
  %(prog)s -d mydb -U myuser -h localhost -p 5432

  # С паролем и кастомной директорией
  %(prog)s -d mydb -U myuser -W -o ./my_export

  # Использование переменных окружения
  export PGDATABASE=mydb
  export PGUSER=myuser
  export PGPASSWORD=mypass
  %(prog)s
        """
    )
    
    parser.add_argument('-d', '--database', 
                       default=os.environ.get('PGDATABASE'),
                       help='Имя базы данных (по умолчанию: $PGDATABASE)')
    parser.add_argument('-U', '--user',
                       default=os.environ.get('PGUSER'),
                       help='Имя пользователя (по умолчанию: $PGUSER)')
    parser.add_argument('-h', '--host',
                       default=os.environ.get('PGHOST', 'localhost'),
                       help='Хост сервера (по умолчанию: localhost)')
    parser.add_argument('-p', '--port',
                       default=os.environ.get('PGPORT', '5432'),
                       help='Порт сервера (по умолчанию: 5432)')
    parser.add_argument('-W', '--password',
                       action='store_true',
                       help='Запросить пароль')
    parser.add_argument('-o', '--output',
                       default='./database_export',
                       help='Директория для экспорта (по умолчанию: ./database_export)')
    
    args = parser.parse_args()
    
    # Проверка обязательных параметров
    if not args.database:
        parser.error('Необходимо указать имя базы данных (-d/--database или $PGDATABASE)')
    if not args.user:
        parser.error('Необходимо указать имя пользователя (-U/--user или $PGUSER)')
    
    # Подготовка параметров подключения
    connection_params = {
        'database': args.database,
        'user': args.user,
        'host': args.host,
        'port': args.port
    }
    
    # Получение пароля
    if args.password:
        import getpass
        password = getpass.getpass(f"Пароль для пользователя {args.user}: ")
        connection_params['password'] = password
    elif os.environ.get('PGPASSWORD'):
        connection_params['password'] = os.environ.get('PGPASSWORD')
    
    # Создание экземпляра и выполнение экспорта
    dumper = PostgreSQLDumper(connection_params, args.output)
    dumper.export_all()


if __name__ == '__main__':
    main()