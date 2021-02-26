# nlw4-trilhaNode
Evento NextLevelWeek #4 da RocketSeat

- [Configuração do Ambiente](https://www.notion.so/Configura-es-do-ambiente-Node-js-ae9fea3f78894139af4268d198294e2a)
## aula01 22/02/2021 - Rumo ao próximo nível - #rumoaoproximonivel

- [Notion Aula 1](https://www.notion.so/Dia-1-Fundamentos-do-NodeJS-a0040fa51a764bdaaf5648fedbf6fb4d)
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

- [Notion Aula 2](https://www.notion.so/danileao/Dia-2-Iniciando-com-o-Banco-de-Dados-ffa8a141872641b7b13338f339d7a69b)

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

## aula03 24/02/2021 - Testando a nossa aplicação - #focopraticagrupo

- [Notion Aula 3](https://www.notion.so/Dia-3-Testando-a-nossa-aplica-o-6b517e6d081241258009c640f7032cde)

O objetivo desta aula é refatorar o código, separando responsabilidades. Criação de testes. Criação da tabela de pesquisas.

Não é responsabilidade do Repository ter acesso ao Banco de dados, por isso, isolar o Repository, um dos focos desta aula.

Para gerar a Migrations **CreateSurveys**
`$ yarn typeorm migration:create -n CreateSurveys`
 assim é gerado um arquivo na pasta **migrations** que deve ser configurado com as propriedades da tabela, neste caso da tabela **surveys**. E está pronto para rodar.

Para rodar a Migration e criar a tabela **surveys**
`$ yarn typeorm migration:run` (Roda todas as Migrations)

### Ferramentas para Testes

#### Jest

`$ yarn add jest @types/jest -D`

Criar o arquivo de configuração **jest.config.ts** 📝 `$ yarn jest --init` 

#### The following questions will help Jest to create a suitable configuration for your project

✔ Would you like to use Jest when running "test" script in "package.json"? … **yes**

✔ Would you like to use Typescript for the configuration file? … **yes**

✔ Choose the test environment that will be used for testing › **node**

✔ Do you want Jest to add coverage reports? … **no**

✔ Which provider should be used to instrument code for coverage? › **v8**

✔ Automatically clear mock calls and instances between every test? … **yes**

📝 Modificações no arquivo **jest.config.ts**  

```
  bail: true,
  // testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/__tests__/*.test.ts"],

```

Criação da pasta `./src__tests__` onde os arquivoes de teste devem terminar com `.test.ts`

Instalação da biblioteca de Preset **ts-jest** `$ yarn add -D ts-jest `

#### Exemplo de um primeiro Teste

Criar o arquivo **./src/__tests__/First.test.ts**


```
  describe("First", () => {
    it("deve ser possível somar 2 números", () => {
        expect(2 + 2).toBe(4);
    });

    it("deve ser possível somar 2 números", () => {
        expect(2 + 2).not.toBe(5);
    });
  });
```

Executar na linha de comando: `$ yarn test`.
Espera-se que passa os dois testes.

#### [SuperTest](https://www.npmjs.com/package/supertest)

Instalando o **supertest** `$ yarn add supertest @types/supertest -D`

Modificar o **server.ts** e criar o **app.ts** para que o **supertest** possa manipular o express.

Também é necessário criar um banco de dados para testes, para não mexer no banco de produção nem de desenvolvimento. Esse banco será selecionado de acordo com a variável de ambiente **NODE_ENV**.

E ele deve ser apagado após a execução de cada teste.
Trecho do **package.json** seção **scripts**: 

```
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js",
    "test": "NODE_ENV=test jest",
    "posttest": "rm ./src/database/database.test.sqlite"
  },
```

Parar rodar os testes: `$ yarn test`

## 🎓 Quem ministrou?

As aulas foram ministradas pela [Rocketseat](https://github.com/Rocketseat) **[Daniele Leão](https://github.com/danileao)** na **Next Level Week 04**.

## aula04 25/02/2021 - Envio de e-mail - #

- [Notion Aula 4](https://www.notion.so/danileao/Dia-4-Envio-de-e-mail-1b85cb36f0a84e5e90a43e3acbce5674)