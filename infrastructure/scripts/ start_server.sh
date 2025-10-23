#!/bin/bash
set -e
cd /home/ubuntu/app
source venv/bin/activate

echo "Starting Django app with Gunicorn..."
nohup gunicorn myproject.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3 \
  --daemon \
  --access-logfile /home/ubuntu/app/gunicorn-access.log \
  --error-logfile /home/ubuntu/app/gunicorn-error.log