import React, { ButtonHTMLAttributes, Children } from 'react';
import { Container } from './styles';
import { bool } from 'yup';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> &{
//   loading?: boolean;
// }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
