#!/bin/bash
set -o pipefail

echo "Введите логин пользователя БД:"
read -s USER

echo "Подключение к БД"
mysql -u $USER -p basic < ./database/sql/tables/users.sql
mysql basic < ./database/sql/tables/previous_jobs.sql

if [[ $? -eq 0 ]]; then
  echo "Таблицы созданы"
else
  echo "Ошибка создания таблиц"
fi