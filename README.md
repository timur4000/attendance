# PostgreSQL Database Objects Dumper

Набор инструментов для экспорта объектов базы данных PostgreSQL в отдельные файлы с валидным DDL кодом.

## Описание

Эти инструменты позволяют экспортировать каждый объект вашей базы данных PostgreSQL (таблицы, представления, функции, процедуры, триггеры и т.д.) в отдельный файл .sql. Это удобно для:

- Контроля версий структуры базы данных в Git
- Анализа и документирования структуры БД
- Выборочного восстановления отдельных объектов
- Миграции между базами данных

## Возможности

### Экспортируемые объекты:
- **Схемы** (CREATE SCHEMA)
- **Таблицы** (CREATE TABLE с ограничениями, индексами, комментариями)
- **Представления** (CREATE VIEW)
- **Функции** (CREATE FUNCTION)
- **Процедуры** (CREATE PROCEDURE) - для PostgreSQL 11+
- **Триггеры** (CREATE TRIGGER)
- **Последовательности** (CREATE SEQUENCE)
- **Пользовательские типы** (ENUM, композитные типы, домены)
- **Индексы** (CREATE INDEX)
- **Расширения** (CREATE EXTENSION)

### Особенности:
- Сохранение комментариев к объектам и колонкам
- Правильный порядок зависимостей
- Структурированная организация файлов по типам и схемам
- Поддержка GENERATED колонок и IDENTITY
- Экспорт только структуры, без данных

## Установка

### Для Bash-скрипта:
```bash
# Скачайте скрипт
wget https://raw.githubusercontent.com/yourusername/pg-dump-objects/main/pg_dump_objects.sh

# Сделайте исполняемым
chmod +x pg_dump_objects.sh
```

### Для Python-скрипта:
```bash
# Установите зависимости
pip install -r requirements.txt

# Или просто psycopg2
pip install psycopg2-binary
```

## Использование

### Bash-скрипт

#### Базовое использование:
```bash
DB_NAME=mydb DB_USER=myuser ./pg_dump_objects.sh
```

#### С паролем:
```bash
DB_NAME=mydb DB_USER=myuser DB_PASSWORD=mypass ./pg_dump_objects.sh
```

#### С указанием хоста и порта:
```bash
DB_NAME=mydb DB_USER=myuser DB_HOST=localhost DB_PORT=5432 ./pg_dump_objects.sh
```

#### С кастомной директорией экспорта:
```bash
DB_NAME=mydb DB_USER=myuser EXPORT_DIR=/path/to/export ./pg_dump_objects.sh
```

### Python-скрипт

#### Базовое использование:
```bash
python pg_dump_objects.py -d mydb -U myuser
```

#### С паролем (будет запрошен интерактивно):
```bash
python pg_dump_objects.py -d mydb -U myuser -W
```

#### С указанием хоста и порта:
```bash
python pg_dump_objects.py -d mydb -U myuser -h localhost -p 5432
```

#### С кастомной директорией экспорта:
```bash
python pg_dump_objects.py -d mydb -U myuser -o /path/to/export
```

#### Использование переменных окружения:
```bash
export PGDATABASE=mydb
export PGUSER=myuser
export PGPASSWORD=mypass
export PGHOST=localhost
export PGPORT=5432

python pg_dump_objects.py
```

## Структура экспорта

После выполнения скрипта будет создана следующая структура директорий:

```
database_export/
├── export_info.txt          # Информация об экспорте (bash)
├── export_info.json         # Информация об экспорте (python)
├── summary.md               # Сводка по экспорту (bash)
├── README.md                # Подробная документация (python)
├── schemas/                 # Определения схем
│   └── public.sql
├── tables/                  # Таблицы
│   └── public/
│       ├── users.sql
│       └── orders.sql
├── views/                   # Представления
│   └── public/
│       └── user_orders_view.sql
├── functions/               # Функции
│   └── public/
│       └── calculate_total.sql
├── procedures/              # Процедуры (PostgreSQL 11+)
│   └── public/
│       └── process_order.sql
├── sequences/               # Последовательности
│   └── public/
│       └── users_id_seq.sql
├── types/                   # Пользовательские типы
│   └── public/
│       └── order_status.sql
├── triggers/                # Триггеры
│   └── public/
│       └── users_updated_at_trigger.sql
├── indexes/                 # Индексы
│   └── public/
│       └── users_email_idx.sql
└── extensions/              # Расширения
    └── uuid-ossp.sql
```

## Восстановление из экспорта

### Восстановление всей базы данных:

```bash
# Создайте новую базу данных
createdb -U postgres newdb

# Восстановите объекты в правильном порядке
for dir in extensions schemas types sequences tables views functions procedures triggers indexes; do
    find ./database_export/$dir -name "*.sql" -exec psql -U postgres -d newdb -f {} \;
done
```

### Восстановление отдельных объектов:

```bash
# Восстановить конкретную таблицу
psql -U postgres -d mydb -f ./database_export/tables/public/my_table.sql

# Восстановить все функции определенной схемы
for file in ./database_export/functions/my_schema/*.sql; do
    psql -U postgres -d mydb -f "$file"
done
```

## Различия между скриптами

### Bash-скрипт (pg_dump_objects.sh):
- ✅ Не требует дополнительных зависимостей
- ✅ Использует стандартные утилиты PostgreSQL (psql, pg_dump)
- ✅ Быстрая работа
- ❌ Менее детальная обработка некоторых объектов
- ❌ Ограниченная обработка ошибок

### Python-скрипт (pg_dump_objects.py):
- ✅ Более детальная обработка всех типов объектов
- ✅ Лучшая обработка ошибок и логирование
- ✅ Поддержка комментариев к объектам
- ✅ Расширенная статистика
- ✅ Кроссплатформенность
- ❌ Требует установки psycopg2

## Ограничения

1. **Только структура**: Скрипты экспортируют только DDL, без данных
2. **Без прав доступа**: GRANT/REVOKE команды не экспортируются
3. **Без владельцев**: Информация о владельцах объектов не сохраняется
4. **Версия PostgreSQL**: Python-скрипт оптимизирован для PostgreSQL 11+, но работает и с более старыми версиями

## Рекомендации

1. **Для контроля версий**: Используйте Python-скрипт для более детального экспорта
2. **Для быстрого бэкапа структуры**: Используйте Bash-скрипт
3. **Для полного бэкапа**: Используйте стандартный pg_dump с соответствующими параметрами

## Примеры использования

### Ежедневный экспорт структуры для Git:
```bash
#!/bin/bash
# backup_structure.sh

DATE=$(date +%Y%m%d)
EXPORT_DIR="/backup/db_structure/$DATE"

# Экспорт структуры
python pg_dump_objects.py -d production_db -U postgres -o "$EXPORT_DIR"

# Коммит в Git
cd "$EXPORT_DIR"
git init
git add .
git commit -m "Database structure backup $DATE"
git remote add origin git@github.com:company/db-structure.git
git push -u origin main
```

### Сравнение структур двух баз данных:
```bash
# Экспорт первой базы
python pg_dump_objects.py -d db1 -U postgres -o ./export_db1

# Экспорт второй базы
python pg_dump_objects.py -d db2 -U postgres -o ./export_db2

# Сравнение
diff -r ./export_db1 ./export_db2
```

## Поддержка

При возникновении проблем:

1. Проверьте версию PostgreSQL: `psql --version`
2. Убедитесь в правильности параметров подключения
3. Проверьте права пользователя на чтение системных таблиц
4. Для Python-скрипта проверьте установку psycopg2: `pip show psycopg2-binary`

## Лицензия

MIT License - свободно используйте и модифицируйте под свои нужды.
