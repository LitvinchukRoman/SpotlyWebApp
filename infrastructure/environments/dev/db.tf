resource "aws_db_subnet_group" "main" {
  name       = "my-app-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "my-app-db-subnet-group"
  }
}

resource "aws_security_group" "aurora_sg" {
  name        = "aurora-db-sg"
  description = "Allow inbound traffic from backend instances to Aurora"
  vpc_id      = var.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = 5432
    to_port         = 5432
    security_groups = [var.ec2_security_group_id]
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

resource "aws_rds_cluster" "main" {
  cluster_identifier      = "my-app-aurora-cluster"
  engine                  = "aurora-postgresql"
  engine_version          = "15.3"
  database_name           = "myappdb"
  master_username         = "dbadmin"
  master_password         = random_password.master.result
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.aurora_sg.id]
  skip_final_snapshot     = true
  backup_retention_period = 7

  lifecycle {
    ignore_changes = [master_password]
  }
}

resource "aws_rds_cluster_instance" "main" {
  identifier         = "my-app-aurora-instance-1"
  cluster_identifier = aws_rds_cluster.main.id
  instance_class     = "db.t3.medium"
  engine             = aws_rds_cluster.main.engine
  engine_version     = aws_rds_cluster.main.engine_version
}