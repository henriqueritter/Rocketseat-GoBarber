import React from 'react';

import { useTransition } from 'react-spring';

import { Container } from './styles';
import Toast from './Toast';

//Interface importada
import { ToastMessage } from '../../hooks/toast';
interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 }, //faz com que o elemento comece fora da tela
      enter: { right: '0%', opacity: 1 }, //temos todas as opcoes do CSS aqui dentro
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map((
        { item, key, props }, //dentro do props tem a estilizacao
      ) => (
        <Toast
          key={key}
          style={props} //propriedades de estilizacao do React Sprint
          message={item}
        ></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
