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

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

}

resource "aws_ebs_volume" "backend" {
  availability_zone = module.backend_ec2_instance.availability_zone
  size              = 2

  tags = {
    Name = "backend-extended"
  }
}

resource "aws_volume_attachment" "backend" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.backend.id
  instance_id = module.backend_ec2_instance.id
}