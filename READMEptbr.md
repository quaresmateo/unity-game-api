# Aplicativo Adonis API

Este é o padrão para a criação de um servidor API em AdonisJs, ele vem pré-configurado.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Configuração

Use o comando adonis para instalar o blueprint

```bash
adonis new yardstick --api-only
```

ou clone manualmente o repo e execute `npm install`.


### Migrações

Execute o seguinte comando para executar migrações de inicialização.

```js
adonis migration:run
```
