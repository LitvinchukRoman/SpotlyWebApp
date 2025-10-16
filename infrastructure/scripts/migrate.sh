#!/bin/bash
set -e
cd /home/ubuntu/app
source venv/bin/activate

echo "Applying Django migrations..."
python manage.py migrate --noinput