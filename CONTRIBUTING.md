# Requirements 🚀

You will need to have nodejs install. if you haven't yet go to [nodejs.org](https://nodejs.org, "go to nodejs.org")

You will also need mongodb as database

## clone the repo 📇

open your terminal and type

```bash

git clone ..

```
## navigating to file 📑

```bash

cd blog-site

```

## Install all dependencies 📌

```bash

npm install

```

#### Install dependecy for client side

```bash

cd client

```

```bash

npm install

```

```bash

cd ../

```

## setup mongodb

if you are on linux
then you need to run

```bash

sudo service mongod start

```

you will be prompt for your `password`
Enter your password then you ready to go.

when you are editing code. Don't forget to `stop mongod`.
To stop your mongod

```bash

sudo service mongod stop

```

Again, you will be prompt for your `password`.
Enter your password

Before stopping `mongod`. Make sure, you stopped server

If you are on `windows` or `mac`. please read mongodb docs

## You are ready to start server 🏹

```bash

npm run dev

```

## start client

```bash

cd client/

```

```bash

npm run dev

```


## To format your code

```npm

npm run lint

```

## see this blog-site is runing on your browser 🎉

Go to [localhost:5000](http://localhost:5000, "Go to admin side of blog-website")

Go tp [localhost:30000](http://localhost:3000, "Go to client side of blog-website")