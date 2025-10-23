data "aws_ami" "latest_ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_launch_template" "main" {
  name_prefix   = "my-app-lt-"
  image_id      = data.aws_ami.latest_ubuntu.id
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  user_data = base64encode(<<-EOF
            #!/bin/bash
            apt-get update -y
            apt-get install -y ruby-full wget
            
            cd /home/ubuntu
            wget https://aws-codedeploy-eu-central-1.s3.eu-central-1.amazonaws.com/latest/install
            chmod +x ./install
            ./install auto
            
            systemctl start codedeploy-agent
            systemctl enable codedeploy-agent
              EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "my-app-ec2"
      CodeDeploy = "true"
    }
  }

}



resource "aws_autoscaling_group" "main" {
  name_prefix = "my-app-asg-"

  desired_capacity = 2
  min_size         = 1
  max_size         = 4

  vpc_zone_identifier = [aws_subnet.private_a.id, aws_subnet.private_b.id]

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