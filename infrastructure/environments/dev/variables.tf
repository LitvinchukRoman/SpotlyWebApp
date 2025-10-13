variable "aws_region" {
  type        = string
  description = "The AWS region to deploy resources in."
  default     = "eu-west-1"
}

variable "domain_name" {
  type        = string
  description = "The domain name for the website (e.g., www.my-app.com)."
  default     = "spotly.mylabstep.com"
}

variable "instance_type" {
  type        = string
  description = "The instance type for EC2 instances."
  default     = "t3.micro"
}

# (Опціонально) Можна залишити, якщо ви хочете перевизначати назву бакету
variable "aws_s3_bucket_name" {
  type        = string
  description = "The name of the S3 bucket to create."
  default     = "spotly-web-app-frontend"
}