terraform {
  backend "s3" {
    bucket  = "spotly-web-app-backend"
    encrypt = true
    key     = "eu-west-1/terraform.tfstate"
    region  = "eu-west-1"
  }
}
