import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlertProvider from './hooks/NotificationSnackbar';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiAutocomplete: {
      defaultProps: { size: 'small' },
    }
  },
  palette: {
    primary: {
      main: '#fcb800',
    },
    secondary: {
      main: '#000', // Change the secondary color to your desired color
    },
  }
});

root.render(
  <React.StrictMode>
    {/* <ErrorBoundary fallback={<ErrorPage></ErrorPage>}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <AlertProvider>
              <App />
            </AlertProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
