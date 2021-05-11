<img src="https://raw.githubusercontent.com/HBeserra/markdown-images/main/2021/04/19-10-11-26-f7f00eefdb55ba115e91e601ff6806c0a36b6c44.png" title="" alt="" data-align="center">

# Configuração

Criar uma conta no [cloud mongodb](https://account.mongodb.com/) configuração [passo a passo](https://docs.google.com/document/d/1nt7BVpqFmejD_4Hti6QfZe6YK20hR_Ud5G4RXgADjWM/edit?usp=sharing)

## Arquivo .env

```
DB_URL=mongodb://root:example@localhost:27017/mypackagedev?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
SERVER_BASE_URL=http://localhost
SERVER_PORT=3333
AUTH_SECRET=0
SMTP_URL=smtp://localhost:1025/
SMTP_LOGIN=
STMP_PASSWORD=
```

# API Gerenciador de encomendas

## Usuario/Vendedor

```
db: user
    - _id: ObjectID required
    - timestamp: Integer, required
    - name: String, required
    - email: { 
        address: String, required
        confirmed: Bool, default false
      }
    - password: {
        hash: String, required                # Hash da senha do usuario
        salt: String, required                 # String utilizada para criar o hash da senha
      }
    - stores: [ObjectID]
    - packages: [ObjectID]
```

###### Criando o hash

A hash é gerada utilizando `hash = func_hash(salt + plaintext-password)`, o `salt` é uma string aleatoria gerada para evitar ataques de dicionario.

| Rota             | Metodo | Função                          | Scopes                                 | Descrição                                                                                       | request                   |
| ---------------- | ------ | ------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------- |
| `/user/`         | `GET`  | `userReadAccountInfo`           | `user-read-data` ou `user-change-data` | retorna as informações da conta do usuario                                                      | `_id` Opcional            |
| `/user/`         | `POST` | `userCreateAccount`             | -                                      | Cria uma nova conta de usuario **limita a uma conta por email** - envia um email de confirmação | `name` `email` `password` |
| `/user/`         | `PUT`  | `userModifyAccount`             | `user-change-data`                     | Altera informações da conta                                                                     | `update`                  |
| `/user/`         | `PUT`  | `userModifyAccountEmail`        | `user-change-data`                     |                                                                                                 | `email`                   |
| -                | -      | -                               | -                                      |                                                                                                 |                           |
| `/auth/`         | `POST` | `authLogin`                     | -                                      |                                                                                                 | `email` `password`        |
| `/auth/password` | `GET`  | `authResetPasswordConfirmation` | `password-reset`                       |                                                                                                 | `password`                |
| `/auth/password` | `POST` | `authResetPassword`             | -                                      |                                                                                                 | `email`                   |
| `/auth/email`    | `GET`  | `authEmailConfirmation`         | `email-confirmation`                   |                                                                                                 | -                         |
| `/auth/email`    | `POST` | `authResendAccountConfirmation` | -                                      |                                                                                                 | `email`                   |

## Lojas

Um usuario pode ter uma ou mas lojas em sua conta, cada loja deve ter um `administrador` que podera adicionar ou remover outros usuarios, esses usuarios teram acesso como um vendedor podendo adicionar ou remover produtos fazer vendas e controlar os pacotes enviados, porem não podem editar as informações da loja ou remover um produto, venda ou encomenda do historico da loja.

```
db: store
    - _id: ObjectID required
    - timestamp: Integer, required
    - name: String, required                    # Nome da loja
    - admin: ObjectID, required              # ID do dono da loja
    - users: [ObjectID]                      # ID's dos vendedores
    - location: {
        zip: Integer,required                   # Cep da loja para calculo de frete
      } 
    - images: {
        logo: Binary
      }
```

## Vendas

Uma venda tras o conjunto de produtos, informações do cliente, informaçõe da venda, e o/os pacotes a serem enviados, as vendas são atribuidas a loja e ao vendedor.

## Mongodb

```
user
  - _id: ObjectID required
  - timestamp: Integer, required
  - name: String, required
  - email: { 
      address: String, required
      confirmed: Bool, default false
    }
  - password: {
      hash: String, required                # Hash da senha do usuario
      salt:String, required                 # String utilizada para criar o hash da senha
    }
  - stores: [ObjectID]
  - packages: [ObjectID]
```

#### Criando o hash

A hash é gerada utilizando `hash = func_hash(salt + plaintext-password)`, o `salt` é uma string aleatoria gerada para evitar ataques de dicionario.

```
store
  - _id: ObjectID required
  - timestamp: Integer, required
  - name: String, required                  # Nome da loja
  - admin_id: ObjectID, required              # ID do dono da loja
  - users_id: [ObjectID]                      # ID's dos vendedores
  - location: {
      zip: Integer,required                 # Cep da loja para calculo de frete
    } 
  - tags: [$tag]                            # Tags utilizadas na loja
  - products: [$product]
```

```
product
  - _id: ObjectID required
  - timestamp: Integer, required
  - store-id: ObjectID required               # Id da loja a qual o produto pertence
  - name: String, require                   # Nome do produto
  - for-sale: bool, required                # Se o produto esta a venda ou se so é utilizado como marteria prima
  - description: String                     # descrição/anotações
  - price: Integer                          # Valor de venda do produto com 3 casas decimais
  - production-time: Integer, default 0     # Tempo de produção+postagem do item
  - calculate-shipping: bool, required      # Calculo automatico de frete 
  - default-package: {
      height: Integer                       # Altura em cm 
      width: Integer                        # Largura em cm 
      length: Integer                       # Comprimento em cm 
      weight: Integer                       # peso em g 
    }
  - stock: [$stock-item] 
  - required: [{        
      product-id: String                    # ID do produto necessario para a produção
      quantity: Integer, required if product-id   # Quantidade 3 casas decimais 1u = 1000
    }]
```

```
stock-item
  - _id: ObjectID required
  - timestamp: Integer, required
  - product-id: ObjectID required             # ID do produto a qual o item em estoque pertenceo marteria prima
  - description: String                     # descrição/anotações
  - price: Integer                          # Valor de compra com 3 casas decimais
  - amount: Integer                         # Quantidade em estoque com 3 casas decimais  
  - batch: String                           # Lote do produto
  - validity: Integer, required                       # timestamp da data de vencimento, -1 para o para não aplicavel
```

```
tag
  - name: String, required
  - type: String [product, sale, tracking]
  - color: String
```

```
order
  - _id: String required
  - timestamp: Integer, required
  - store-id: String, required
  - vendor-id: String, required
  - discount: Integer
  - discount-type: Integer  
  - description: String
  - status: String [placed, produced, sent]
  - products: [{
      product_id: String                          # ID do produto
      amount: Integer, required if product_id     # quantidade 3 casas decimais
      raw-price: Integer, required if product_id  # Valor do produto no momento da compra
      discount: Integer                           # Quantidade do desconto
      discount-type: bool, required if discount   # Desconto no valor ou em porcetagem
    }]
  - packages: [$package]
  - notifications: {
      email: [{
        address: String
        name: String
        muted: bool, default false
      }]
    }
```

```
package
  - _id: String required
  - timestamp: Integer, required
  - store-id: String, required
  - order-id: String
  - status: String, required, [created, posted, in-transit, delivered, archived]
  - shipping-company: String, required, [correios]
  - addressee:{
      zip: String, required
      address: String, required
      number: String
      notes: String
    }
  - correios: {
      code: String, required
      last-update: {
          timestamp: Integer
          data: {}
      }cancel
    }
```

| Status     | Decrição                                   |
| ---------- | ------------------------------------------ |
| created    | etiqueta criada, ponto para ser postado    |
| posted     | produto enviado para os correios           |
| in-transit | em transporte pela transportadora          |
| delivered  | entregue pela transportadora               |
| archive    | arquivado automaticamente ou pelo vendedor |

No status `delivered` ou `archive` o sistema para de atualizar o status do pacote

## API

##### Autenticação e Usuario

| Rota             | Metodo | Função                          | Scopes               | Descrição                                                                                       | request                   |
| ---------------- | ------ | ------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- | ------------------------- |
| `/user/`         | `GET`  | `userReadAccountInfo`           | `user-read-data`     | retorna as informações da conta do usuario                                                      | `_id` Opcional            |
| `/user/`         | `POST` | `userCreateAccount`             | -                    | Cria uma nova conta de usuario **limita a uma conta por email** - envia um email de confirmação | `name` `email` `password` |
| `/user/`         | `PUT`  | `userModifyAccount`             | `user-change-data`   | Altera informações da conta                                                                     | `update`                  |
| `/user/`         | `PUT`  | `userModifyAccountEmail`        | `user-change-data`   |                                                                                                 | `email`                   |
| -                | -      | -                               | -                    |                                                                                                 |                           |
| `/auth/`         | `POST` | `authLogin`                     | -                    |                                                                                                 | `email` `password`        |
| `/auth/password` | `GET`  | `authResetPasswordConfirmation` | `password-reset`     |                                                                                                 | `password`                |
| `/auth/password` | `POST` | `authResetPassword`             | -                    |                                                                                                 | `email`                   |
| `/auth/email`    | `GET`  | `authEmailConfirmation`         | `email-confirmation` |                                                                                                 | -                         |
| `/auth/email`    | `POST` | `authResendAccountConfirmation` | -                    |                                                                                                 | `email`                   |

### Lojas

| Rota     | Metodo   | Função          | Scopes                                    | Descrição | request          |
| -------- | -------- | --------------- | ----------------------------------------- | --------- | ---------------- |
| `/store` | `POST`   | `add`           | `store-change-data`                       |           | `name` `address` |
| `/store` | `GET`    | `readStoreInfo` | `store-read-data`  ou `store-change-data` |           | `_id`            |
| `/store` | `PUT`    | `editStoreInfo` | `store-change-data`                       |           | `update`         |
| `/store` | `DELETE` | `deleteStore`   | `store-change-data`                       |           | -                |

### Produtos

| Rota             | Método   | Função          | Scopes                                    | Descrição | request  |
| ---------------- | -------- | --------------- | ----------------------------------------- | --------- | -------- |
| `/store/product` | `GET`    | `getProduct`    | `store-read-data` ou `store-change-data`  |           |          |
| `/store/product` | `POST`   | `add`           | `store-change-data`                       |           | `name`   |
| `/store/product` | `GET`    | `readStoreInfo` | `store-read-data`  ou `store-change-data` |           | `_id`    |
| `/store/product` | `PUT`    | `editStoreInfo` | `store-change-data`                       |           | `update` |
| `/store/product` | `DELETE` | `deleteStore`   | `store-change-data`                       |           | -        |

To Do 

- [ ] Alteração nas informações do usuario

- [ ] Deletar conta

- [x] recuperação de email e conta

- [ ] Sertificado SSL

- [ ] Docker - Mongodb e nodejs
