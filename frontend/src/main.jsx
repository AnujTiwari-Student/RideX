import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {persistor, store} from './store/store.js'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createConnection } from './features/socketSlice';

function SocketWrapper({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createConnection(`${import.meta.env.VITE_BASE_URL}`)); 
    }, [dispatch]);

    return children;
}

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <SocketWrapper> 
          <App />
        </SocketWrapper>
        <Toaster />
      </BrowserRouter>
      </PersistGate>
    </Provider>
)
