resource "aws_elasticache_subnet_group" "main" {
  name       = "my-app-cache-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "my-app-cache-subnet-group"
  }
}

resource "aws_elasticache_replication_group" "main" {
  replication_group_id       = "my-app-redis-cluster"
  description                = "Redis cluster for application caching and session storage"
  node_type                  = "cache.t3.micro"
  num_cache_clusters         = 1
  port                       = 6379
  automatic_failover_enabled = false

  subnet_group_name  = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.elasticache_sg.id]

  tags = {
    Name = "my-app-redis"
  }
}