// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import store from './redux/store';
import theme from './theme/theme';
import AppRoutes from './routes/Routes';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppRoutes />
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
