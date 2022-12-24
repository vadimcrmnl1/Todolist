import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {createRoot} from "react-dom/client";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50'
        },
        secondary: {
            main: '#ff9100'
        },
       type: 'light'
    }
})
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <AppWithRedux />
        </Provider>

    </ThemeProvider>)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
