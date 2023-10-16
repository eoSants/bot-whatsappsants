const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    logQR: false,
  })
  .then((client) => start(client)) //inicia o cliente
  .catch((error) => console.log(error));


 
  function start(client) {
    let hasSentWelcomeMessage = false; // Flag para verificar se a mensagem de boas-vindas já foi enviada
  
    client.onMessage(async (message) => {
      if (!hasSentWelcomeMessage) {
        await client
          .sendText(
            message.from,
            '🥰 *Olá, Como Vai?*\n\n *Eu a assistente virtual do CETEP.*\n\n ☝️🤨 _*Como posso te ajudar?*_ \n\n 1️⃣ *- Informações de matrícula;*\n 2️⃣ *- Informações sobre o histórico;*\n 3️⃣ *- Transferências;*\n 4️⃣ *- Atendimento direto;*\n 5️⃣ *- Encerrar atendimento*\n'
          )
          .then((result) => {
            console.log('Result: ', result);
          })
          .catch((error) => {
            console.error('Error when sending: ', error);
          });
        hasSentWelcomeMessage = true; // Define a flag como verdadeira para indicar que a mensagem de boas-vindas foi enviada
      } else {
        switch (message.body) {
          case '1':
            await client
              .sendText(message.from, 'Resposta da 1° opição')
              .then((result) => {
                console.log('Result: ', result);
              })
              .catch((error) => {
                console.error('Error when sending: ', error);
              });
            break;
          case '2':
            await client.sendText(message.from, 'Resposta da 2ª opção.');
            break;
          case '3':
            await client.sendText(message.from, 'Resposta da 3ª opção.');
            break;
          case '4':
            await client.sendText(message.from, 'Resposta da 4ª opção.');
            break;
          case '5':
            await client.sendText(message.from, 'Resposta da 5ª opção.');
            break;
          case '6':
            await client.sendText(message.from, 'Resposta da 6ª opção.');
            break;
          default:
            // Lidar com qualquer outra mensagem ou fazer algo
            break;
        }
      }
    });
  }
  
