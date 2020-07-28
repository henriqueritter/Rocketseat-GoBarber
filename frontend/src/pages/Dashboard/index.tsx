import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const handleLogoff = useCallback(() => {
    signOut();
    history.push('/');
  }, [signOut, history]);

  return (
    <Container>
      <Content>
        <h1>DashBoard</h1>
        <Button type="button" onClick={() => handleLogoff()}>
          Sair
        </Button>
      </Content>
    </Container>
  );
};

export default Dashboard;
