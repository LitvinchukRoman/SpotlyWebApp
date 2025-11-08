resource "aws_iam_user" "backend_dev" {
  name = "backend-dev-user"
  tags = {
    Purpose = "Local backend S3 access"
    Env     = "dev"
  }
}

resource "aws_iam_user_policy" "backend_dev_s3_access" {
  name = "backend-dev-s3-policy"
  user = aws_iam_user.backend_dev.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:ListBucket"
        ],
        Resource = "arn:aws:s3:::spotly-user-avatars-dev"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ],
        Resource = "arn:aws:s3:::spotly-user-avatars-dev/*"
      }
    ]
  })
}

resource "aws_iam_access_key" "backend_dev_key" {
  user = aws_iam_user.backend_dev.name
}

output "backend_dev_access_key_id" {
  value = aws_iam_access_key.backend_dev_key.id
  sensitive = true
}

output "backend_dev_secret_access_key" {
  value = aws_iam_access_key.backend_dev_key.secret
  sensitive = true
}