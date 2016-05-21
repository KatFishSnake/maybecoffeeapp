# MaybeCoffeeApp
This may turn out to be worthy coffee app but for now its just a bunch of experiments

## Stack
Backend
- NodeJs (Express)
- Sockets.io
- CouchDb

Frontend
- Semantic-ui (temp)

## Overview
Currently to setup the project you need to:
- Start CouchDb instance on it's default `localhost:5984`
- npm install `package.json`
- Free up port `3000` overwise change server port [here](https://github.com/KatFishSnake/maybecoffeeapp/blob/master/server.js#L71)
- `node --harmony server.js`
