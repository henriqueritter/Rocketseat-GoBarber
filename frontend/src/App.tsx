import React from 'react';
//Importado para adicionar as rotas
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

//Importado
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  </>
);

export default App;
