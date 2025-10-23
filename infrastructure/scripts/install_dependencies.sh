#!/bin/bash
set -e
cd /home/ubuntu/app

echo "Installing Python dependencies..."
sudo apt-get update -y
sudo apt-get install -y python3-pip python3-venv

python3 -m venv venv
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt