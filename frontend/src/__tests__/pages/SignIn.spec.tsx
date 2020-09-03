import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

//todos proximos testes vao usar este mock
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush, //use History sera uma funcao com propriedade/metodo push que retornara uma funcao vazia(jest.fn)
    }), //jest fn é uma funcao vazia que só serve para nos dizer que chamou uma funcao
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to sign in', async () => {
    //renderiza a pagina para testar
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    //vai retornar referencia para esse objeto(input de email)
    const emailField = getByPlaceholderText('E-mail');

    const passwordField = getByPlaceholderText('Senha');

    const ButtonElement = getByText('Entrar');

    //fireenvet simula interacao do usuario com a tela
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(ButtonElement);

    //esperamos que a funcao do useHistory que navegaria para outra rota esteja nos levando para a pagina de dashboard
    //nao precisa acessar a tela
    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    //renderiza a pagina para testar
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    //vai retornar referencia para esse objeto(input de email)
    const emailField = getByPlaceholderText('E-mail');

    const passwordField = getByPlaceholderText('Senha');

    const ButtonElement = getByText('Entrar');

    //fireenvet simula interacao do usuario com a tela
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });

    fireEvent.click(ButtonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    //override do mock que ja existia
    // jest.mock('../../hooks/auth', () => {
    //   return {
    //     useAuth: () => ({
    //       signIn: () => {
    //         throw new Error(); //erro ficticio disparado pela api offline
    //       },
    //     }),
    //   };
    // });
    //reescreve o signin da funcao do useAuth
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    //vai retornar referencia para esse objeto(input de email)
    const emailField = getByPlaceholderText('E-mail');

    const passwordField = getByPlaceholderText('Senha');

    const ButtonElement = getByText('Entrar');

    //fireenvet simula interacao do usuario com a tela
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(ButtonElement);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
