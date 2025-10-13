resource "aws_route53_record" "cloudfront_alias" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "spotly.mylabstep.com"
  type    = "A"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}