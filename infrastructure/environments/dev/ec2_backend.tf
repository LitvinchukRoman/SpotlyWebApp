module "backend_ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name = "spotly-backend"

  instance_type          = "t3.small"
  key_name               = aws_key_pair.deployer_key.key_name
  monitoring             = true
  subnet_id              = module.vpc.private_subnets[0]
  vpc_security_group_ids = [aws_security_group.private_sg.id]
  create_security_group  = false

  ami = data.aws_ami.ubuntu.id

  user_data = file("${path.module}/setup_script.sh")

  root_block_device = {
    volume_size           = 4
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

}

