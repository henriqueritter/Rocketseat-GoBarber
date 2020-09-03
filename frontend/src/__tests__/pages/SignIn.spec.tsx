import React from 'react';
import SignIn from '../../pages/SignIn';
import { render, fireEvent } from '@testing-library/react';

const mockedHistoryPush = jest.fn();

//todos proximos testes vao usar este mock
jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useHistory: () => ({
      push: mockedHistoryPush, //use History sera uma funcao com propriedade/metodo push que retornara uma funcao vazia(jest.fn)
    }), //jest fn é uma funcao vazia que só serve para nos dizer que chamou uma funcao
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    //renderiza a pagina para testar
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    //vai retornar referencia para esse objeto(input de email)
    const emailField = getByPlaceholderText('E-mail');

    const passwordField = getByPlaceholderText('Senha');

    const ButtonElement = getByText('Entrar');

    //fireenvet simula interacao do usuario com a tela
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });

    fireEvent.click(ButtonElement);

    //esperamos que a funcao do useHistory que navegaria para outra rota esteja nos levando para a pagina de dashboard
    //nao precisa acessar a tela
    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
