import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/scss/main.scss'
import App from 'views/App';
import reportWebVitals from './reportWebVitals';
import MetaHeader from 'components/navigation/MetaHeader';

ReactDOM.render(
  <React.StrictMode>
    <MetaHeader />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
