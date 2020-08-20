import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// toda vez que houver uma injecao de depen chamada HashProvider, ele devera injetar a classe BCryptHash
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
