interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: { from: { email: string; name: string } };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'email@teste.com',
      name: 'Email de Teste',
    },
  },
} as IMailConfig; // garante que o driver seja apenas um desses dois
