locals {
  bucket_domain = aws_s3_bucket.mybucket.bucket_regional_domain_name
}

data "aws_cloudfront_origin_request_policy" "all_viewer" {
  name = "Managed-AllViewer"
}

resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "my-app-s3-oac"
  description                       = "Origin Access Control for S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Main distribution for the application"
  default_root_object = "index.html"

  origin {
    origin_id                = "s3-frontend-origin"
    domain_name              = local.bucket_domain
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
  }

  origin {
  origin_id   = "alb-backend-origin"
  domain_name = aws_lb.main.dns_name

  custom_origin_config {
    http_port              = 80
    https_port             = 443
    origin_protocol_policy = "http-only"

    origin_ssl_protocols   = ["TLSv1.2"]
  }
}

  default_cache_behavior {
    target_origin_id       = "s3-frontend-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  }

  # Додаткова поведінка: запити, що починаються з /api/, йдуть на Load Balancer
  ordered_cache_behavior {
    path_pattern           = "/api/*"
    target_origin_id       = "alb-backend-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer.id
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.main.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}