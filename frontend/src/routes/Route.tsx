import React from 'react';
//importado para usar na interface
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; //para receber o componente como <Component /> e nao {Component}
}

//isPrivate se nao vier entao é inicializada como false
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  //verifica se nesta variavel tem algo, se tiver o usuario ja esta logado
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      //funcao verifica se a rota é privada e o user NAO esta autenticado, envia para login,
      // se estiver logado e a rota nao for private envia para o dashboard,
      // se for private e estiver logado entao continua a exibir o normal solicitado
      render={({ location }) => {
        //location usado para armazenar o historico de onde veio
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard', //se nao estiver logado va para login, se nao va para dashboard
              state: { from: location }, //state é
              //passado aqui para manter o historico das rotas aqui do usuario(salva os redireciionamentos)
            }}
          />
        );
      }}
    />
  );
};

export default Route;
