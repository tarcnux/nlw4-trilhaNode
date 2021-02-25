# nlw4-trilhaNode
Evento NextLevelWeek #4 da RocketSeat

## aula01 22/02/2021 - Rumo ao próximo nível - #rumoaoproximonivel

### Setup inicial de um projeto Node.js

Criação do package.json
`$ yarn init -y`

`$ yarn add express`

`$ yarn add -D @types/express`

`$ yarn add -D typescript`

`$ yarn add -D ts-node-dev`

Criação do tsconfig.json
`$ yarn tsc --init`
#### Inicializando o Git

`$ git init `

`$ git commit -m "first commit" `

`$ git branch -M main `

`$ git remote add origin https://github.com/tarcnux/nlw4-trilhaNode.git `

`$ git push -u origin main `

#### Trecho do package.json

```
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

Para rodar a aplicação: `$ yarn dev `
## aula02 23/02/2021 - Banco de Dados - #jornadainfinita

### Modelo Entidade Relacionamento
![Modelo](https://github.com/tarcnux/nlw4-trilhaNode/blob/main/ModeloEntidadeRelacionamento.png)

### Ferramenta de visualização de banco de dados
[Beekeeper Studio](https://www.beekeeperstudio.io/)

`$ sudo snap install beekeeper-studio`
### Setup inicial para lidar com banco de dados

`$ yarn add typeorm reflect-metadata`

SQLite 3 `$ yarn add sqlite3`

Cria na mão e configura o **ormconfig.json**, bem como cria a pasta **./src/database** e o arquivo **index.ts** em seu interior. Após feito essas configurações iniciais, basta rodar o comando `$ yarn dev` para a criação do arquivo **database.sqlite**

#### Trecho do package.json com o CLI typeorm
```
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
  },
```

Teste de funcionamento do script
`$ yarn typeorm -h`

#### Migrations
Para criação das migrations, cria-se a pasta **./src/database/migrations** e completa o arquivo **ormconfig.json**

```
{
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations": ["./src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```

Para gerar a Migrations **CreateUsers**
`$ yarn typeorm migration:create -n CreateUsers`
 assim é gerado um arquivo na pasta **migrations** que deve ser configurado com as propriedades da tabela, neste caso da tabela **users**. E está pronto para rodar.

Para rodar a Migration e criar a tabela **users**
`$ yarn typeorm migration:run` (Roda todas as Migrations)

Para faze rum **Rollback** desfazendo o comando anterior, basta usar `$ yarn typeorm migration:revert` 

#### Controller, Model e Repository
Para manipulação da tabela foi criado um controller, um model e um usersRepository.

A responsabilidade de criação do **id** será da aplicação e não do banco de dados, para tanto é necessário importar a biblioteca **uuid** `$ yarn add uuid` bem como seus tipos `$ yarn add -D @types/uuid`

Importante configurar no **ormconfig.json** o caminho das entidades, vide trecho do arquivo abaixo:

```
"entities": ["./src/models/*.ts"],
```

## aula03 24/02/2021 - Testando a nossa aplicação - #

O objetivo desta aula é refatorar o código, separando responsabilidades. Criação de testes. Criação da tabela de pesquisas.

Não é responsabilidade do Repository ter acesso ao Banco de dados, por isso, isolar o Repository, um dos focos desta aula.

Para gerar a Migrations **CreateSurveys**
`$ yarn typeorm migration:create -n CreateSurveys`
 assim é gerado um arquivo na pasta **migrations** que deve ser configurado com as propriedades da tabela, neste caso da tabela **surveys**. E está pronto para rodar.

Para rodar a Migration e criar a tabela **surveys**
`$ yarn typeorm migration:run` (Roda todas as Migrations)