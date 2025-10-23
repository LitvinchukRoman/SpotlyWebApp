#!/bin/bash
set -e

# Update package index
echo "Updating package index..."
sudo apt update -y

# Install prerequisites
echo "Installing prerequisites..."
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    gnupg \
    lsb-release

# Install Git
echo "Installing Git..."
sudo apt install -y git

# Add Docker’s official GPG key
echo "Adding Docker GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "Adding Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
echo "Updating package index for Docker..."
sudo apt update -y

# Install Docker Engine
echo "Installing Docker..."
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Start and enable Docker
echo "Enabling Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group (optional)
echo "Adding current user to docker group..."
sudo usermod -aG docker $USER

# Install Docker Compose plugin (modern method)
echo "Installing Docker Compose..."
sudo apt install -y docker-compose-plugin

# Verify installations
echo "Verifying installations..."
docker --version
docker compose version
git --version

echo "Installation complete! You may need to log out and log back in to use Docker as a non-root user."