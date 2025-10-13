resource "aws_s3_bucket" "mybucket" {
  bucket = "spotly-web-app-frontend-${random_id.unique_suffix.hex}"

  tags = {
    Name = var.aws_s3_bucket_name
    Environment = "Dev"
  }
}

resource "random_id" "unique_suffix" {
  byte_length = 6
}

locals {
  frontend_files = fileset("../../../frontend", "**/*")
}

locals {
  mime_types = {
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
  }
}

resource "aws_s3_object" "frontend_files" {
  for_each = local.frontend_files

  bucket = aws_s3_bucket.mybucket.id
  key = each.key
  source = "../../frontend/${each.value}"
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), "application/octet-stream")
  etag = filemd5("../../frontend/${each.value}")
}

