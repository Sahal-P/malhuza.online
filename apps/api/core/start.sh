#!/bin/bash

python manage.py makemigrations document
python manage.py makemigrations authentication
python manage.py makemigrations s3

python manage.py migrate --no-input

python manage.py runserver 0.0.0.0:8000
# python manage.py check

# daphne -b 0.0.0.0 -p 8000 watsapp_backend.asgi:application
