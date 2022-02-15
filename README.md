# Project MIS

### Client
Go to client's folder
Run this command to start the expo
```sh
  yarn start
```

## Server
Go to the server's folder
Run this to the terminal to seed the db 
```sh
npx prisma migrate dev --name init && npx prisma db seed --preview-feature
```
Then start the docker containers to start the server and db:
```sh
docker-compose up
```
