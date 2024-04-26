import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
// import eruda from 'eruda';
// eruda.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
            <App/>
            <ToastContainer position='bottom-left' autoClose={2000}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
