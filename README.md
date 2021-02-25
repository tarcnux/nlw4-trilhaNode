# nlw4-trilhaNode
Evento NextLevelWeek #4 da RocketSeat

## aula01 22/02/2021

### Setup inicial de um projeto Node.js

Criação do package.json
`$ yarn init -y`

`$ yarn add express`

`$ yarn add -D @types/express`

`$ yarn add -D typescript`

`$ yarn add -D ts-node-dev`

Criação do tsconfig.json
`$ yarn tsc --init`

#### Trecho do package.json

```
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

#### Inicializando o Git

`$ git init `

`$ git commit -m "first commit" `

`$ git branch -M main `

`$ git remote add origin https://github.com/tarcnux/nlw4-trilhaNode.git `

`$ git push -u origin main `

