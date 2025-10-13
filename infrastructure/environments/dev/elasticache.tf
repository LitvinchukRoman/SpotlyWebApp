resource "aws_elasticache_subnet_group" "main" {
  name       = "my-app-cache-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "my-app-cache-subnet-group"
  }
}

resource "aws_security_group" "elasticache_sg" {
  name        = "elasticache-sg"
  description = "Allow inbound traffic from backend instances to Redis"
  vpc_id      = var.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = 6379
    to_port         = 6379
    security_groups = [var.ec2_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticache_replication_group" "main" {
  replication_group_id          = "my-app-redis-cluster"
  description                   = "Redis cluster for application caching and session storage"
  node_type                     = "cache.t3.micro"
  num_cache_clusters            = 1
  port                          = 6379
  automatic_failover_enabled    = true             

  subnet_group_name             = aws_elasticache_subnet_group.main.name
  security_group_ids            = [aws_security_group.elasticache_sg.id]
  
  tags = {
    Name = "my-app-redis"
  }
}