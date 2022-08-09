## Url Api Online

```
  https://api-cotemig-project.herokuapp.com/
```

## Documentação da API

## Pokemons
#### Retorna todos os pokemons

```http
  GET api/pokemons
```
#### Retorna um pokemon específico

```http
  GET api/pokemon/${name}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do pokemon que você quer |

## Usuários
#### Cria um usuário

```http
  POST api/create-user
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do seu usuário |
| `password`      | `string` | **Obrigatório**. A senha do seu usuário |

#### Verificação de usuário

```http
  POST api/login
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do seu usuário |
| `password`      | `string` | **Obrigatório**. A senha do seu usuário |

#### Atualizar usuário

```http
  PUT api/login
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` |  **Obrigatório**. O ID do usuário para atualizar |
| `newUser`      | `object` |  **Obrigatório**. O objeto que irá conter os novos dados |
| `newUser.name`      | `string` | O nome do seu usuário |
| `newUser.password`      | `string` | A senha do seu usuário |
| `oldPassword`      | `string` | A senha antiga do usuário, caso for alterar a senha |

#### Deletar de usuário

```http
  DELETE api/login
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário para deletar |

## Favoritos
#### Listar Favoritos

```http
  GET api/favorite?id={id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário |

#### Favoritar pokemon

```http
  POST api/favorite
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_id`      | `string` | **Obrigatório**. O ID do usuário |
| `poke_id`      | `string` | **Obrigatório**. A ID do pokemon |

#### Deletar Favorito

```http
  DELETE api/favorite
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do dado |
