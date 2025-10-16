resource "aws_s3_bucket" "mybucket" {
  bucket = "spotly-web-app-frontend-${random_id.unique_suffix.hex}"

  tags = {
    Name        = var.aws_s3_bucket_name
    Environment = "Dev"
  }
}

resource "random_id" "unique_suffix" {
  byte_length = 6
}

locals {
  # Вказуємо Terraform сканувати вміст папки `dist`
  frontend_files_path = "../../../frontend/spotly-web-app/dist"
  frontend_files      = fileset(local.frontend_files_path, "**/*")
}

locals {
  mime_types = {
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".svg"  = "image/svg+xml"
  }
}

resource "aws_s3_object" "frontend_files" {
  for_each = local.frontend_files

  bucket = aws_s3_bucket.mybucket.id
  key    = each.key
  source = "${local.frontend_files_path}/${each.value}"

  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), "application/octet-stream")
  etag         = filemd5("${local.frontend_files_path}/${each.value}")
}

resource "aws_s3_bucket_policy" "allow_cloudfront_oac" {
  bucket = aws_s3_bucket.mybucket.id
  policy = data.aws_iam_policy_document.allow_cloudfront_oac_policy.json
}

data "aws_iam_policy_document" "allow_cloudfront_oac_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.mybucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.main.arn]
    }
  }
}

resource "aws_s3_bucket" "deployments" {
  bucket = "spotly-web-app-deployments"
}

