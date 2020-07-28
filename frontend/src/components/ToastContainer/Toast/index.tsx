import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';

//Interface importada
import { ToastMessage, useToast } from '../../../hooks/toast';
interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  //Executa sempre que um toast é criado, é utilizado para fechar ele automaticamente
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000); //executa apos 3 segundos

    return () => {
      //funcao executada se este componente(o toast criado) deixar de existir(for fechado pelo user)
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description} //Transforma o message description em boolean
      style={style}
    >
      {/* Exibe os icones com base na interface criada */}
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
