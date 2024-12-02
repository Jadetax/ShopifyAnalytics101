import React from 'react';
import { AppProvider } from '@shopify/polaris';
import Dashboard from './components/Dashboard';
//import './style/dark-mode.css';


function App() {
    return (
        <AppProvider>
            <Dashboard />
        </AppProvider>
    );
}

export default App;
