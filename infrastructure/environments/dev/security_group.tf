resource "aws_security_group" "load_balancer_sg" {
  name        = "load-balancer-sg"
  description = "Allow HTTP/HTTPS traffic from the internet"
  vpc_id      = aws_vpc.myvpc.id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "load-balancer-sg"
  }
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2-instance-sg"
  description = "Allow traffic only from the Load Balancer"
  vpc_id      = aws_vpc.myvpc.id


  ingress {
    protocol        = "tcp"
    from_port       = 80
    to_port         = 80
    security_groups = [aws_security_group.load_balancer_sg.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-instance-sg"
  }
}