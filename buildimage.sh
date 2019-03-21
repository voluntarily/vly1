$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker build -t vly1-main-repo .
docker tag vly1-main-repo:latest 585172581592.dkr.ecr.ap-southeast-1.amazonaws.com/vly1-main-repo:latest
docker push 585172581592.dkr.ecr.ap-southeast-1.amazonaws.com/vly1-main-repo:latest

