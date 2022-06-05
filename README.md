# Descrição

Projeto para buscar palavras dentro de muitos arquivos.

## Instalação

Para instalar e configurar o ambiente tornando possivel a execução do programa e dos testes, é necessário a realização das seguintes etapas:

- Clone o projeto: `$git clone https://github.com/LeonardoZambello/challenge-luizalabs-cli.git`

- Após concluir o download do projeto, acesse o diretório do mesmo: `$cd challenge-luizalabs-cli`

### Instalando as dependências e configurações

- Para instalar as dependências, execute o comando `npm install`

- Após instalado as dependências, execute o comando `npm link`, como essa é uma aplicação cli feita em NodeJS, é necessário a execução desse comando para que você consiga executar a aplicação.

- Caso tenha algum problema para executar o comando `npm link`, tente executa-lo com o parâmetro --force, dessa forma: `npm link --force`. Se ainda assim ocorrer problemas, execute o comando `sudo npm link`.

- Após a execução do passo anterior, é necessário criar o arquivo `.env` na pasta raiz do projeto e preenche-lo conforme o arquivo `.env.example` demonstra. (A variável que está dentro desse arquivo deve possuir o valor do caminho absoluto do diretório da sua máquina onde estão os arquivos .txt que serão processados).

### Executando o programa

- Para a execução do programa basta digitar o comando `challenge-luizalabs-cli`, esse comando deve ser seguido de pelo menos um parâmetro que ira definir qual etapa a aplicação irá executar.

- Na primeira vez em que for executar o programa, para que tudo ocorra com sucesso, deve-se primeiro executar o comando `challenge-luizalabs-cli pre-script`, com isso, a aplicação irá pré processar toda a massa de dados dos arquivos .txt do diretório configurado no arquivo .env.

- Feito o passo anterior, deve-se então executar o comando `challenge-luizalabs-cli script 'valor1', 'valor2'`, onde valor1 e valor2 são as palavras que serão pesquisadas dentro da massa de dados dos arquivos já preparada através da execução do pré-script.

### Executando os testes

- Para rodar todos os testes unitários dentro do projeto, é necessário a execução do comando `npm run test`.

- Também é possível rodar o comando `npm run test:cov` para ver a cobertura de testes do projeto. Após executar esse comando, o Jest irá gerar uma pasta chamada `coverage` na raiz do projeto, acessando o arquivo `$cd /coverage/lcov-report/index.html`, é possível ver de uma forma mais agradável a cobertura de testes do projeto.