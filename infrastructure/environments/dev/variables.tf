variable "aws_s3_bucket_name" {
  type        = string
  description = "The name of the S3 bucket to create."
  default     = "spotly-web-app-frontend"

}

variable "aws_region" {
  type        = string
  description = "The AWS region to deploy resources in."
  default     = "eu-west-1"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "A list of IDs for the private subnets."
  
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "A list of IDs for the public subnets."
  
}

variable "ec2_security_group_id" {
  type        = string
  description = "The ID of the security group for the EC2 instances in the Auto Scaling Group."
  
}

variable "load_balancer_security_group_id" {
  type        = string
  description = "The ID of the security group for the Application Load Balancer."
  
}

variable "vpc_id" {
  type        = string
  description = "The ID of the main VPC."
  
}

variable "instance_type" {
  type        = string
  description = "The instance type for EC2 instances."
  default     = "t3.micro"
  
}

variable "alb_target_group_arn" {
  type        = string
  description = "The ARN of the ALB target group to attach to the Auto Scaling Group."
  
}

variable "domain_name" {
  type        = string
  description = "The domain name for the SSL certificate (e.g., www.my-app.com)."
  default = "spotly.mylabstep.com"
  
}

variable "acm_certificate_arn" {
  type        = string
  description = "The ARN of the ACM certificate for the Load Balancer."
  
}

variable "alb_dns_name" {
  type        = string
  description = "The DNS name of the Application Load Balancer."
  
}

variable "cloudfront_domain_name" {
    type = string
    description = "The domain name of the CloudFront distribution."
  
}

variable "cloudfront_hosted_zone_id" {
    type = string
    description = "The hosted zone ID for CloudFront distributions."
    default = "Z2FDTNDATAQYW2" # This is the fixed hosted zone ID for CloudFront

}