resource "aws_key_pair" "admin_key" {
  key_name   = "admin-bastion-key"
  public_key = file(var.admin_public_key_path)
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.latest_ubuntu.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public_a.id

  key_name = aws_key_pair.admin_key.key_name

  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  tags = {
    Name = "my-app-bastion-host"
  }

  user_data = <<-EOF

        echo "--- Starting user-data script ---"

        export DEBIAN_FRONTEND=noninteractive
        apt-get update
        apt-get upgrade -y
        apt-get install -y postgresql-client redis-tools

        adduser devuser --disabled-password --gecos ""
        mkdir -p /home/devuser/.ssh
        touch /home/devuser/.ssh/authorized_keys

        echo "${var.admin_public_key}" > /home/devuser/.ssh/authorized_keys

        if [[ -n "${var.developer_public_key}" ]]; then
        echo "--- Adding developer public key ---"
        echo "${var.developer_public_key}" >> /home/devuser/.ssh/authorized_keys
        fi

        echo "--- Setting correct permissions for .ssh folder ---"
        chown -R devuser:devuser /home/devuser/.ssh
        chmod 700 /home/devuser/.ssh
        chmod 600 /home/devuser/.ssh/authorized_keys

        echo "--- User-data script finished successfully ---"
        EOF
}

resource "aws_eip" "bastion_eip" {
  instance = aws_instance.bastion.id

  tags = {
    Name = "my-app-bastion-eip"
  }
}
