#!/bin/bash
echo "Stopping running Django app (if any)..."
pkill -f "gunicorn" || true