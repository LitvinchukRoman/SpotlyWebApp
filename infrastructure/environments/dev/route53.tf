data "aws_route53_zone" "spotly_zone" {
  name = "mylabstep.com."
}

# Frontend
resource "aws_route53_record" "frontend_record" {
  zone_id = data.aws_route53_zone.spotly_zone.zone_id
  name    = "spotly.${data.aws_route53_zone.spotly_zone.name}"
  type    = "A"
  ttl     = 300

  records = [module.frontend_ec2_instance.public_ip]
}

# Monitoring
resource "aws_route53_record" "prometheus_record" {
  zone_id = data.aws_route53_zone.spotly_zone.zone_id
  name    = "prometheus.${data.aws_route53_zone.spotly_zone.name}"
  type    = "A"
  ttl     = 300

  records = [module.monitoring_ec2_instance.public_ip]
}

resource "aws_route53_record" "grafana_record" {
  zone_id = data.aws_route53_zone.spotly_zone.zone_id
  name    = "grafana.${data.aws_route53_zone.spotly_zone.name}"
  type    = "A"
  ttl     = 300

  records = [module.monitoring_ec2_instance.public_ip]
}



