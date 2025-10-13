resource "aws_db_subnet_group" "main" {
  name       = "my-app-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "my-app-db-subnet-group"
  }
}

resource "aws_security_group" "aurora_sg" {
  name        = "aurora-db-sg"
  description = "Allow inbound traffic from backend instances to Aurora"
  vpc_id      = aws_vpc.myvpc.id

  ingress {
    protocol        = "tcp"
    from_port       = 5432
    to_port         = 5432
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "my-app/db-credentials"
}

resource "random_password" "master" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = random_password.master.result
}

resource "aws_db_instance" "main" {
  identifier     = "my-app-dev-db"
  engine         = "postgres"
  engine_version = "15.14"
  instance_class = "db.t3.micro"

  allocated_storage = 20
  storage_type      = "gp2"

  db_name                = "myappdb"
  username               = "dbadmin"
  password               = aws_secretsmanager_secret_version.db_credentials.secret_string
  vpc_security_group_ids = [aws_security_group.aurora_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  multi_az            = false
  publicly_accessible = false
  skip_final_snapshot = true

  tags = {
    Name = "my-app-dev-db"
  }
}