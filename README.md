# disparadorsms
Angular App para gerenciamento de disparos de mensagens sms -  Angular 12.

Instalação e execução:
==========================

Execução normal do npm install e npm start para execuçãop da aplicação.
package.json executando tanto ng serve do angular como serviço de
json-serve para simulação de banco de dados e requests http.

Regras de negocio:
==========================

A aplicação se inicia com o painel de criação de novo disparo,
com o formulario reativo e todos os campos solicitados nos requisitos do projeto.

Por esse painel é possível também habilitar a visualização de 
disparos já agendados, com o botão Exibir/Ocultar agendamentos.

Os agendamentos de disparos listados a direita, podem ser editados ou excluídos
clicando sobre um dos registros listados. Os dados correspondentes são populados
no painel, e novos botões são exibidos no modo de edição.

Caso queira desistir da edição do registro selecionado,
basta clicar novamente sobre o registro.

O botão "Atualizar Agendamento" atualiza o registro já existente selecionado.
O botão "Excluir Agendamento" exclui o registro selecionado.
O botão "Salvar como Novo" permite que um novo registro seja criado
com os dados do registro selecionado. 

Upload de arquivo csv:
==========================

Conforme solicitado nos requisitos do projeto, a aplicação
permite o upload de um arquivo csv contendo listas
de números para disparo, e é feito pelo botão "Upload CSV" no painel
da aplicação.

Para simulação do recurso, utilizar o arquivo "ListaNovosContatos.csv"
disponível na pasta "disparadorSms/src/assets".

Uma vez feito o upload do arquivo, o projeto exibe uma segunda tabela 
com registros de novos contatos. Ao clicar em um dos registros, os dados
parciais populam o formulario do painel, e assim é possível criar um novo 
disparo com os dados.
==========================

O projeto utiliza o Angular Material conforme sugerido no desafio,
além do primeNg para montagem das tabelas e fxLayout para montagem do template.
E para a simulação de requisições HTTP e manipulação da base de dados JSON
(localizada no arquivo db.json na pasta raiz do projeto), é utilizado o pacote
json-server que roda com o npm-start configurado no package.json. 

O projeto utiliza vários recursos do Angular como componentização, formularios reativos,
aplicação de rotas, lazy-loading de modulos, segmentação de modulos, compartilhamento
de dados entre componentes via serviços configurados por Eventemitter, pipes, 
formularios reativos, entre outros. 





