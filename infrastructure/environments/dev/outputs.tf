output "bucket_name" {
  description = "The unique name (ID) of the S3 bucket."
  value       = aws_s3_bucket.mybucket.bucket
}

output "bucket_arn" {
  description = "The ARN of the S3 bucket, used for IAM policies."
  value       = aws_s3_bucket.mybucket.arn
}

output "bucket_regional_domain_name" {
  description = "The regional domain name of the bucket, ideal for CloudFront origin."
  value       = aws_s3_bucket.mybucket.bucket_regional_domain_name
}

output "website_url" {
  description = "The public URL for the static website hosted in the bucket."
  value       = aws_s3_bucket.mybucket.website_endpoint
}

output "vpc_id" {
  description = "The ID of the main VPC."
  value       = aws_vpc.myvpc.id
}

output "public_subnet_ids" {
  description = "A list of IDs for the public subnets."
  value = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id
  ]
}

output "private_subnet_ids" {
  description = "A list of IDs for the private subnets."
  value = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id
  ]
}

output "load_balancer_security_group_id" {
  description = "The ID of the security group for the Application Load Balancer."
  value       = aws_security_group.load_balancer_sg.id
}

output "ec2_security_group_id" {
  description = "The ID of the security group for the EC2 instances in the Auto Scaling Group."
  value       = aws_security_group.ec2_sg.id
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.main.domain_name
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "The zone ID of the Application Load Balancer for Route 53 alias records."
  value       = aws_lb.main.zone_id
}

output "alb_https_listener_arn" {
  description = "The ARN of the HTTPS listener."
  value       = aws_lb_listener.https.arn
}

output "alb_target_group_arn" {
  description = "The ARN of the target group."
  value       = aws_lb_target_group.app.arn
}

output "redis_primary_endpoint" {
  description = "The primary endpoint address for the ElastiCache Redis cluster. Use this for writes."
  value       = aws_elasticache_replication_group.main.primary_endpoint_address
}

output "redis_reader_endpoint" {
  description = "The reader endpoint for the ElastiCache Redis cluster. Use this for read-only operations."
  value       = aws_elasticache_replication_group.main.reader_endpoint_address
}

output "redis_port" {
  description = "The port on which the Redis cluster is listening."
  value       = aws_elasticache_replication_group.main.port
}

output "elasticache_security_group_id" {
  description = "The ID of the security group attached to the ElastiCache cluster."
  value       = aws_security_group.elasticache_sg.id
}

output "db_cluster_endpoint" {
  description = "The writer endpoint for the Aurora cluster. Use this for all primary connections."
  value       = aws_rds_cluster.main.endpoint
}

output "db_reader_endpoint" {
  description = "The reader endpoint for the Aurora cluster. Use this for read-only queries to scale read operations."
  value       = aws_rds_cluster.main.reader_endpoint
}

output "db_name" {
  description = "The name of the initial database created in the cluster."
  value       = aws_rds_cluster.main.database_name
}

output "db_master_username" {
  description = "The master username for the database."
  value       = aws_rds_cluster.main.master_username
}

output "db_port" {
  description = "The port on which the database is listening."
  value       = aws_rds_cluster.main.port
}

output "db_credentials_secret_arn" {
  description = "The ARN of the secret in AWS Secrets Manager containing the master password."
  value       = aws_secretsmanager_secret.db_credentials.arn
}

output "db_security_group_id" {
  description = "The ID of the security group attached to the Aurora cluster."
  value       = aws_security_group.aurora_sg.id
}