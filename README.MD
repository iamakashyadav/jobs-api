URL: https://jobs-api-wtzq.onrender.com/

To see the api-docs got to 
https://jobs-api-wtzq.onrender.com/api-docs

#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Setup .env in the root

2. Add MONGO_URI, JWT_SECRET_KEY in .env

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```


#### package.json
## continous transpile the ts code to js  if something change and run the server.js in watch mode
```
"my-dev": "tsc --watch && node --watch dist/server.js",
```

## 
"dev": "ts-node-dev --respawn --transpile-only src/server.ts",