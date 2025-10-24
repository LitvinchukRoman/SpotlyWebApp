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

variable "admin_public_key_path" {
  type        = string
  description = "Path to the admin's public SSH key."
  default     = "~/.ssh/id_ed25519.pub"
}

variable "developer_public_key" {
  description = "Публічний SSH-ключ розробника. Якщо не вказано, користувач 'devuser' не буде створений."
  type        = string
  default     = "" # Це робить змінну опціональною
}

variable "admin_public_key" {
  description = "Публічний SSH-ключ адміністратора для доступу до bastion host."
  type        = string
  default     = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA6jMFjjppv9oqnvskKP3C1nF++wngP/VVhZJ7Tf2aa5 litvi@MacBook-Air-LitvinchukRoman.local"

}