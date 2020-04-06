Request Catcher
===============


# How to Run?

### Docker
If you are using docker provided within this project then it's pretty easy

`$ npm install`

`$ docker-compose up`

wait till image is built

the end

### Node + ngrok
1. download npm
2. download node
3. download ngrok
4. navigate to project
5. `$ npm install`
6. `$ npm start` or if you need more logging `$ DEBUG=* npm start`
7. run ngrok to get reached by outside calls or use public IP

# How it works?

Dashboard is under root path so navigate to `127.0.0.1:3000/`

Here is your dashboard where you can inspect all coming request (except request to dashboard path)

to catch request you need to navigate to e.g. `127.0.0.1:3000/test` without exiting dashboard you will be notified in real time that request been called

OR

`$ curl -X POST -d '{ "message": "Hello HTTP!"}' 127.0.0.1:3000/test`

![](https://i.ibb.co/bW91QNk/image.png)
![](https://i.ibb.co/cbFG52S/image.png)
