# wstests
Mini project for testing ws connections

# Como usar

Basta preencher o nome e senha do restaurante a ser testado no código, e rodar:

```
yarn
yarn start
```

Incialmente serão retornados os items de impressão pendentes no formato JSON.

# Descrição

### Eventos:

- open: abre uma conexão com o servidor;
- ping: testa se a conexão está ativa;
- pong: retorno do cliente ou do servidor após um ping;
- close: fechamento de conexão pelo client/server;
- error: erro ao estabelecer conexão, pode ocorrer um fim forçado de conexão;
- message: dados recebidos pelo client/server após um ***send*** no server/client;

### Mensagens:

Quando a conexão é estabelecida são enviados todos items de impressão pendentes, quando um
novo pedido é realizado serão retornadas os dados para impressão do pedido (por enquanto só mesas numeradas).

O formato da mensagem sempre será JSON no seguinte padrão:

```json
{
  "type": "print-items",
  "status": "OK",
  "data": [ "..." ],
}
```
