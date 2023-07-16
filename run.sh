cd ./app

pm2 start angular-http-server --name roller -- index.html -p 80

pm2 save