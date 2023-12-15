import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import htaccess from './.htaccess'

import AppRouter from './router/AppRouter';

const App = () => {
    

    return(
        <AppRouter />
    );
}

ReactDOM.render(<App />, document.getElementById('app'));