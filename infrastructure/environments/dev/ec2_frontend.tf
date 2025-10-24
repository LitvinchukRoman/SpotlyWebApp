module "frontend_ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name = "spotly-frontend"

  instance_type          = "t3.micro"
  key_name               = aws_key_pair.deployer_key.key_name
  monitoring             = true
  subnet_id              = module.vpc.public_subnets[0]
  vpc_security_group_ids = [aws_security_group.public_sg.id]
  create_eip             = true
  create_security_group  = false

  ami = data.aws_ami.ubuntu.id

  user_data = file("${path.module}/setup_script.sh")

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

}