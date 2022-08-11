import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DAppProvider, Goerli } from '@usedapp/core'

const config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      [Goerli.chainId]: 'https://goerli.infura.io/v3/285481d349074f069e04e9b98cef1f32',
    },
    multicallVersion: 2,
  }

ReactDOM.render(
    <DAppProvider config={config}>
        <App />
    </DAppProvider>, 
document.getElementById('root'));
