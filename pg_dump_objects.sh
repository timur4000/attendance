#!/bin/bash

# Скрипт для экспорта объектов базы данных PostgreSQL в отдельные файлы
# Каждый объект (таблица, представление, функция, процедура) будет сохранен в отдельном файле

# Параметры подключения к базе данных
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-}"
DB_USER="${DB_USER:-}"
DB_PASSWORD="${DB_PASSWORD:-}"

# Директория для экспорта
EXPORT_DIR="${EXPORT_DIR:-./database_export}"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Функция для проверки параметров
check_params() {
    if [ -z "$DB_NAME" ]; then
        error "Не указано имя базы данных. Используйте: DB_NAME=mydb $0"
        exit 1
    fi
    
    if [ -z "$DB_USER" ]; then
        error "Не указан пользователь базы данных. Используйте: DB_USER=myuser $0"
        exit 1
    fi
}

# Функция для создания структуры директорий
create_directories() {
    log "Создание структуры директорий..."
    
    mkdir -p "$EXPORT_DIR"/{schemas,tables,views,functions,procedures,sequences,types,triggers,indexes}
    
    # Создаем файл с информацией об экспорте
    cat > "$EXPORT_DIR/export_info.txt" <<EOF
База данных: $DB_NAME
Дата экспорта: $(date)
Хост: $DB_HOST:$DB_PORT
Пользователь: $DB_USER
EOF
}

# Функция для выполнения SQL запроса
execute_sql() {
    PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -A -c "$1"
}

# Функция для получения DDL объекта через pg_dump
get_object_ddl() {
    local object_type="$1"
    local schema_name="$2"
    local object_name="$3"
    
    case "$object_type" in
        "table")
            PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
                --schema-only --no-owner --no-privileges \
                -t "\"$schema_name\".\"$object_name\"" 2>/dev/null | \
                grep -v "^--" | grep -v "^$" | grep -v "^SET" | grep -v "^SELECT pg_catalog"
            ;;
        "view")
            PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
                --schema-only --no-owner --no-privileges \
                -t "\"$schema_name\".\"$object_name\"" 2>/dev/null | \
                grep -v "^--" | grep -v "^$" | grep -v "^SET" | grep -v "^SELECT pg_catalog"
            ;;
        "sequence")
            PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
                --schema-only --no-owner --no-privileges \
                -t "\"$schema_name\".\"$object_name\"" 2>/dev/null | \
                grep -v "^--" | grep -v "^$" | grep -v "^SET" | grep -v "^SELECT pg_catalog"
            ;;
    esac
}

# Экспорт схем
export_schemas() {
    log "Экспорт схем..."
    
    local schemas=$(execute_sql "SELECT schema_name FROM information_schema.schemata 
                                WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast') 
                                ORDER BY schema_name")
    
    for schema in $schemas; do
        log "  Экспорт схемы: $schema"
        echo "CREATE SCHEMA IF NOT EXISTS \"$schema\";" > "$EXPORT_DIR/schemas/$schema.sql"
    done
}

# Экспорт таблиц
export_tables() {
    log "Экспорт таблиц..."
    
    local tables=$(execute_sql "SELECT schemaname||'.'||tablename 
                               FROM pg_tables 
                               WHERE schemaname NOT IN ('pg_catalog', 'information_schema') 
                               ORDER BY schemaname, tablename")
    
    for table in $tables; do
        local schema_name=$(echo "$table" | cut -d'.' -f1)
        local table_name=$(echo "$table" | cut -d'.' -f2)
        
        log "  Экспорт таблицы: $schema_name.$table_name"
        
        # Создаем поддиректорию для схемы
        mkdir -p "$EXPORT_DIR/tables/$schema_name"
        
        # Получаем DDL таблицы
        get_object_ddl "table" "$schema_name" "$table_name" > "$EXPORT_DIR/tables/$schema_name/$table_name.sql"
    done
}

# Экспорт представлений
export_views() {
    log "Экспорт представлений..."
    
    local views=$(execute_sql "SELECT schemaname||'.'||viewname 
                              FROM pg_views 
                              WHERE schemaname NOT IN ('pg_catalog', 'information_schema') 
                              ORDER BY schemaname, viewname")
    
    for view in $views; do
        local schema_name=$(echo "$view" | cut -d'.' -f1)
        local view_name=$(echo "$view" | cut -d'.' -f2)
        
        log "  Экспорт представления: $schema_name.$view_name"
        
        mkdir -p "$EXPORT_DIR/views/$schema_name"
        
        # Получаем определение представления
        local view_def=$(execute_sql "SELECT pg_get_viewdef('\"$schema_name\".\"$view_name\"'::regclass, true)")
        
        cat > "$EXPORT_DIR/views/$schema_name/$view_name.sql" <<EOF
CREATE OR REPLACE VIEW "$schema_name"."$view_name" AS
$view_def;
EOF
    done
}

# Экспорт функций и процедур
export_functions() {
    log "Экспорт функций и процедур..."
    
    # Для PostgreSQL 11+
    local routines=$(execute_sql "
        SELECT n.nspname || '.' || p.proname || '(' || 
               pg_catalog.pg_get_function_identity_arguments(p.oid) || ')' as full_name,
               n.nspname as schema_name,
               p.proname as routine_name,
               CASE p.prokind 
                   WHEN 'f' THEN 'FUNCTION'
                   WHEN 'p' THEN 'PROCEDURE'
                   WHEN 'a' THEN 'AGGREGATE'
                   WHEN 'w' THEN 'WINDOW'
               END as routine_type,
               pg_catalog.pg_get_functiondef(p.oid) as definition
        FROM pg_catalog.pg_proc p
        LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        ORDER BY n.nspname, p.proname")
    
    # Обработка результатов
    echo "$routines" | while IFS='|' read -r full_name schema_name routine_name routine_type definition; do
        if [ -n "$full_name" ]; then
            log "  Экспорт $routine_type: $full_name"
            
            # Определяем директорию в зависимости от типа
            if [ "$routine_type" = "PROCEDURE" ]; then
                local dir="procedures"
            else
                local dir="functions"
            fi
            
            mkdir -p "$EXPORT_DIR/$dir/$schema_name"
            
            # Сохраняем определение
            # Заменяем недопустимые символы в имени файла
            local safe_filename=$(echo "$routine_name" | sed 's/[<>:"/\\|?*]/_/g')
            echo "$definition;" > "$EXPORT_DIR/$dir/$schema_name/${safe_filename}.sql"
        fi
    done
}

# Экспорт последовательностей
export_sequences() {
    log "Экспорт последовательностей..."
    
    local sequences=$(execute_sql "SELECT schemaname||'.'||sequencename 
                                  FROM pg_sequences 
                                  WHERE schemaname NOT IN ('pg_catalog', 'information_schema') 
                                  ORDER BY schemaname, sequencename")
    
    for sequence in $sequences; do
        local schema_name=$(echo "$sequence" | cut -d'.' -f1)
        local sequence_name=$(echo "$sequence" | cut -d'.' -f2)
        
        log "  Экспорт последовательности: $schema_name.$sequence_name"
        
        mkdir -p "$EXPORT_DIR/sequences/$schema_name"
        
        # Получаем параметры последовательности
        local seq_info=$(execute_sql "SELECT start_value, min_value, max_value, increment_by, cycle 
                                     FROM pg_sequences 
                                     WHERE schemaname='$schema_name' AND sequencename='$sequence_name'")
        
        IFS='|' read -r start_val min_val max_val increment cycle_option <<< "$seq_info"
        
        cat > "$EXPORT_DIR/sequences/$schema_name/$sequence_name.sql" <<EOF
CREATE SEQUENCE "$schema_name"."$sequence_name"
    START WITH $start_val
    INCREMENT BY $increment
    MINVALUE $min_val
    MAXVALUE $max_val
    $([ "$cycle_option" = "t" ] && echo "CYCLE" || echo "NO CYCLE");
EOF
    done
}

# Экспорт пользовательских типов
export_types() {
    log "Экспорт пользовательских типов..."
    
    local types=$(execute_sql "
        SELECT n.nspname || '.' || t.typname as full_name,
               n.nspname as schema_name,
               t.typname as type_name,
               CASE t.typtype
                   WHEN 'c' THEN 'composite'
                   WHEN 'e' THEN 'enum'
                   WHEN 'd' THEN 'domain'
                   ELSE 'other'
               END as type_kind
        FROM pg_type t
        LEFT JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
          AND t.typtype IN ('c', 'e', 'd')
        ORDER BY n.nspname, t.typname")
    
    echo "$types" | while IFS='|' read -r full_name schema_name type_name type_kind; do
        if [ -n "$full_name" ]; then
            log "  Экспорт типа: $full_name ($type_kind)"
            
            mkdir -p "$EXPORT_DIR/types/$schema_name"
            
            # Получаем DDL типа в зависимости от его вида
            case "$type_kind" in
                "enum")
                    local enum_values=$(execute_sql "
                        SELECT string_agg(quote_literal(enumlabel), ', ' ORDER BY enumsortorder)
                        FROM pg_enum e
                        JOIN pg_type t ON t.oid = e.enumtypid
                        JOIN pg_namespace n ON n.oid = t.typnamespace
                        WHERE n.nspname = '$schema_name' AND t.typname = '$type_name'")
                    
                    echo "CREATE TYPE \"$schema_name\".\"$type_name\" AS ENUM ($enum_values);" > "$EXPORT_DIR/types/$schema_name/$type_name.sql"
                    ;;
                "composite")
                    local composite_def=$(execute_sql "
                        SELECT string_agg(
                            quote_ident(attname) || ' ' || 
                            pg_catalog.format_type(atttypid, atttypmod),
                            ', ' ORDER BY attnum)
                        FROM pg_attribute a
                        JOIN pg_class c ON c.oid = a.attrelid
                        JOIN pg_namespace n ON n.oid = c.relnamespace
                        WHERE n.nspname = '$schema_name' 
                          AND c.relname = '$type_name'
                          AND a.attnum > 0
                          AND NOT a.attisdropped")
                    
                    echo "CREATE TYPE \"$schema_name\".\"$type_name\" AS ($composite_def);" > "$EXPORT_DIR/types/$schema_name/$type_name.sql"
                    ;;
                "domain")
                    local domain_def=$(execute_sql "
                        SELECT pg_catalog.format_type(t.typbasetype, t.typtypmod) || 
                               COALESCE(' ' || pg_get_constraintdef(c.oid), '')
                        FROM pg_type t
                        LEFT JOIN pg_constraint c ON c.contypid = t.oid
                        JOIN pg_namespace n ON n.oid = t.typnamespace
                        WHERE n.nspname = '$schema_name' AND t.typname = '$type_name'")
                    
                    echo "CREATE DOMAIN \"$schema_name\".\"$type_name\" AS $domain_def;" > "$EXPORT_DIR/types/$schema_name/$type_name.sql"
                    ;;
            esac
        fi
    done
}

# Экспорт триггеров
export_triggers() {
    log "Экспорт триггеров..."
    
    local triggers=$(execute_sql "
        SELECT n.nspname || '.' || c.relname || '.' || t.tgname as full_name,
               n.nspname as schema_name,
               c.relname as table_name,
               t.tgname as trigger_name,
               pg_get_triggerdef(t.oid) as definition
        FROM pg_trigger t
        JOIN pg_class c ON c.oid = t.tgrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
          AND NOT t.tgisinternal
        ORDER BY n.nspname, c.relname, t.tgname")
    
    echo "$triggers" | while IFS='|' read -r full_name schema_name table_name trigger_name definition; do
        if [ -n "$full_name" ]; then
            log "  Экспорт триггера: $full_name"
            
            mkdir -p "$EXPORT_DIR/triggers/$schema_name"
            
            echo "$definition;" > "$EXPORT_DIR/triggers/$schema_name/${table_name}_${trigger_name}.sql"
        fi
    done
}

# Экспорт индексов
export_indexes() {
    log "Экспорт индексов..."
    
    local indexes=$(execute_sql "
        SELECT n.nspname || '.' || c.relname || '.' || i.relname as full_name,
               n.nspname as schema_name,
               c.relname as table_name,
               i.relname as index_name,
               pg_get_indexdef(idx.indexrelid) as definition
        FROM pg_index idx
        JOIN pg_class i ON i.oid = idx.indexrelid
        JOIN pg_class c ON c.oid = idx.indrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
          AND NOT idx.indisprimary
        ORDER BY n.nspname, c.relname, i.relname")
    
    echo "$indexes" | while IFS='|' read -r full_name schema_name table_name index_name definition; do
        if [ -n "$full_name" ]; then
            log "  Экспорт индекса: $full_name"
            
            mkdir -p "$EXPORT_DIR/indexes/$schema_name"
            
            echo "$definition;" > "$EXPORT_DIR/indexes/$schema_name/${table_name}_${index_name}.sql"
        fi
    done
}

# Создание сводного файла
create_summary() {
    log "Создание сводного файла..."
    
    cat > "$EXPORT_DIR/summary.md" <<EOF
# Экспорт базы данных $DB_NAME

Дата экспорта: $(date)

## Структура экспорта

- **schemas/** - определения схем
- **tables/** - определения таблиц
- **views/** - определения представлений
- **functions/** - определения функций
- **procedures/** - определения процедур
- **sequences/** - определения последовательностей
- **types/** - определения пользовательских типов
- **triggers/** - определения триггеров
- **indexes/** - определения индексов

## Статистика

EOF

    # Добавляем статистику
    for dir in schemas tables views functions procedures sequences types triggers indexes; do
        if [ -d "$EXPORT_DIR/$dir" ]; then
            local count=$(find "$EXPORT_DIR/$dir" -name "*.sql" | wc -l)
            echo "- $dir: $count объектов" >> "$EXPORT_DIR/summary.md"
        fi
    done
}

# Главная функция
main() {
    log "Начало экспорта базы данных $DB_NAME"
    
    # Проверка параметров
    check_params
    
    # Создание директорий
    create_directories
    
    # Экспорт объектов
    export_schemas
    export_types
    export_sequences
    export_tables
    export_views
    export_functions
    export_triggers
    export_indexes
    
    # Создание сводного файла
    create_summary
    
    log "Экспорт завершен! Результаты сохранены в: $EXPORT_DIR"
    log "Просмотрите файл summary.md для получения информации об экспорте"
}

# Запуск скрипта
main