import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/Main';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";




const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Main />
    {/* <App/> */}
    </BrowserRouter>
  </Auth0Provider>
);