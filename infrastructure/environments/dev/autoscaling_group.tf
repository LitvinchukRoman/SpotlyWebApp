resource "aws_launch_template" "main" {
  name_prefix   = "my-app-lt-"
  image_id      = "ami-047bb4163c506cd98"
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  user_data = base64encode(<<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from EC2 instance $(hostname -f)</h1>" > /var/www/html/index.html
              echo "Server is healthy" > /var/www/html/health
              EOF
  )

  tags = {
    Name = "my-app-launch-template"
  }
}

resource "aws_autoscaling_group" "main" {
  name_prefix = "my-app-asg-"

  desired_capacity = 2
  min_size         = 1
  max_size         = 4

  vpc_zone_identifier = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  launch_template {
    id      = aws_launch_template.main.id
    version = "$Latest"
  }

  target_group_arns = [aws_lb_target_group.app.arn]

}

resource "aws_autoscaling_policy" "cpu_scaling_policy" {
  name                      = "cpu-scaling-policy"
  autoscaling_group_name    = aws_autoscaling_group.main.name
  policy_type               = "TargetTrackingScaling"
  estimated_instance_warmup = 300

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 50.0
  }
}