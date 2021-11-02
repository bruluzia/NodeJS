# Blog 
Essa aplicação simula um blog

## Tecnologias utlizadas
- Mysql
- JavaScript 
- Node.js 
- Express


## Como Executar 
1- Clone o repositório para sua máquina
2- Acesse o caminho do mesmo através do terminal 
3- Baixe e instale MYSQL Workbench, crie um schema chamado 'blogBD'
4- Execute o comando 'npm install express'
5- Execute o comando 'node index.js' no seu terminal 
6- Acesse localhost:8080
7- Acesse http://localhost:8080/admin/users/create para criar um usuário e utilizar as demais funções da aplicação (CRUDS de Categories/Articles/Courses/References)


## Notas
Aplicação consiste em 5 CRUDS completos, com interface gráfica
Utilizamos o padrão REST, e conseguimmos colocar a aplicação no Docker, porém não conseguimos fazer o mesmo com o Banco de Dados, por isso, no passo a passo de como executar inclui a instalação do MYSQL Worckbench e a criação do schema blogBD
