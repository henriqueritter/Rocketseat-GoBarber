import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequestUser {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestUser): Promise<void> {
    // Checa se email existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    // Envia o email
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
