resource "aws_key_pair" "deployer_key" {
  key_name   = "MyKey"
  public_key = file("~/.ssh/id_ed25519.pub")

  tags = {
    Name = "MyKey"
  }
}