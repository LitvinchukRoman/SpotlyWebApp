# -----------------------------------------------------------------------------
# VPC & Networking Outputs
# -----------------------------------------------------------------------------

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

# -----------------------------------------------------------------------------
# Security Group Outputs
# -----------------------------------------------------------------------------

output "load_balancer_security_group_id" {
  description = "The ID of the security group for the Application Load Balancer."
  value       = aws_security_group.load_balancer_sg.id
}

output "ec2_security_group_id" {
  description = "The ID of the security group for the EC2 instances."
  value       = aws_security_group.ec2_sg.id
}

output "db_security_group_id" {
  description = "The ID of the security group for the Aurora database cluster."
  value       = aws_security_group.aurora_sg.id
}

output "elasticache_security_group_id" {
  description = "The ID of the security group for the ElastiCache cluster."
  value       = aws_security_group.elasticache_sg.id
}

# -----------------------------------------------------------------------------
# S3 Bucket Outputs (Frontend Storage)
# -----------------------------------------------------------------------------

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

# -----------------------------------------------------------------------------
# Application Load Balancer Outputs (Backend Entrypoint)
# -----------------------------------------------------------------------------

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "The zone ID of the Application Load Balancer for Route 53 alias records."
  value       = aws_lb.main.zone_id
}

output "alb_target_group_arn" {
  description = "The ARN of the target group for the backend instances."
  value       = aws_lb_target_group.app.arn
}

# -----------------------------------------------------------------------------
# CloudFront Outputs (CDN & Public Access)
# -----------------------------------------------------------------------------

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_domain_name" {
  description = "The public domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.main.domain_name
}

output "bastion_public_ip" {
  description = "Постійна публічна IP-адреса бастіонного хоста."
  value       = aws_eip.bastion_eip.public_ip
}

# -----------------------------------------------------------------------------
# Cache Outputs (ElastiCache Redis)
# -----------------------------------------------------------------------------

output "redis_primary_endpoint" {
  description = "The primary endpoint address for the ElastiCache Redis cluster."
  value       = aws_elasticache_replication_group.main.primary_endpoint_address
}

output "redis_port" {
  description = "The port on which the Redis cluster is listening."
  value       = aws_elasticache_replication_group.main.port
}