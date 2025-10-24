resource "aws_key_pair" "admin_key_backend" {
  key_name   = "admin-backend-key"
  public_key = file(var.admin_public_key_path)
}

resource "aws_instance" "backend" {
  ami           = data.aws_ami.latest_ubuntu.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public_b.id

  key_name = aws_key_pair.admin_key_backend.key_name

  vpc_security_group_ids = [aws_security_group.ec2_sg_backend.id]

  tags = {
    Name = "spotly-backend"
  }

  user_data = <<-EOF

        #!/bin/bash

        RUNNER_USER="ubuntu"
        RUNNER_HOME="/home/$${RUNNER_USER}/actions-runner"
        GITHUB_REPO_URL="https://github.com/LitvinchukRoman/SpotlyWebApp"
        GITHUB_RUNNER_TOKEN="BPMKR7UTAGB7NYTEFUUEKHDI6EWFY"

        export DEBIAN_FRONTEND=noninteractive
        apt-get update
        apt-get upgrade -y
        apt-get install -y curl jq

        touch /home/ubuntu/.ssh/authorized_keys
        echo "${var.admin_public_key}" > /home/ubuntu/.ssh/authorized_keys

        mkdir -p $${RUNNER_HOME}
        cd $${RUNNER_HOME}

        LATEST_VERSION_URL="https://api.github.com/repos/actions/runner/releases/latest"
        RUNNER_URL=$(curl -s $${LATEST_VERSION_URL} | jq -r '.assets[] | select(.name|test("linux-x64")) | .browser_download_url')

        echo "Downloading runner from $${RUNNER_URL}"
        curl -o actions-runner.tar.gz -L $${RUNNER_URL}
        tar xzf ./actions-runner.tar.gz
        rm actions-runner.tar.gz

        chown -R $${RUNNER_USER}:$${RUNNER_USER} $${RUNNER_HOME}

        sudo -u $${RUNNER_USER} ./config.sh --url $${GITHUB_REPO_URL} --token $${GITHUB_RUNNER_TOKEN} --unattended --name "aws-runner-$(hostname -s)" --labels "aws,linux,ubuntu"

        ./svc.sh install $${RUNNER_USER}
        ./svc.sh start
        EOF
}

resource "aws_security_group" "ec2_sg_backend" {
  name        = "ec2-backend-sg"
  description = "Allow HTTP, HTTPS, and SSH inbound traffic"
  vpc_id      = aws_vpc.myvpc.id

  ingress {
    description      = "SSH from anywhere"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "HTTP from anywhere"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "HTTP from anywhere"
    from_port        = 80
    to_port          = 8080
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }


  ingress {
    description      = "HTTPS from anywhere"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1" # "-1" означає всі протоколи
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-security-group"
  }
}

