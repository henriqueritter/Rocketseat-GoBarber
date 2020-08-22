# Macro funcionalidades

**Micro Funcionalidades**

# Tipos(exemplos)

**RF**
Requisitos Funcionais: Funcionalidades que vamos ter, como usuario vai poder recuperar a senha pelo email antigo

**RNF**
Requisitos Nao Funcionais: O serviço de email precisa usar o node-mailer, vamos usar o express;

**RN**
Regras de Negócios:

- O Link enviado para resetar senha deve expirar em 2h.

# Recuperação de Senha

**RF**

- O usuario vai poder recuperar a senha pelo email antigo
- O usuario deve poder, ou não poder, recuperar sua senha informando o email.
- O usuario deve poder resetar sua senha.

**RNF**

- Utilizar o mailtrap para os testes do ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção (amazon simple email service);
- O Envio de e-mails deve acontecer em segundo plano(background job)(alem de a aplicacao estar rodando o email processa na fila como algo paralelo a aplicação que sera processada aos poucos);

**RN**

- O Link enviado para resetar senha deve expirar em 2h.
- O usuario precisa confirmar a nova senha ao resetar a senha.

# Atualização do Perfil

**RF**

- O Usuário deve poder atualizar seu nome, email e senha.

**RNF**

- Não tem

**RN**

- O Usuário não pode alterar seu e-mail para um e-mail ja utilizado por outro usuário.
- Para atualizar a senha o usuário deve informar senha antiga
- Para autalizar a senha o usuário precisa confirmar a nova senha.

# Painel do Prestador

**RF**

- O Prestador deve poder listar seus agendamentos de um dia específico;
- O Prestador deve receber uma notificação sempre que houver um novo agendamento;
- O Prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A Notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mes com pelo menos UM horário disponíveis de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específicos de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- A Listagem de prestadores deve ser armazenada em Cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 08h às 18h (Primeiro às 8h e último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário retroativo;
- O usuário não pode agendar serviços consigo mesmo;
