import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const AlertContext = createContext({ showSuccessAlert: () => { }, showErrorAlert: () => { } });

export const useAlert = () => {
    return useContext(AlertContext);
};

const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleClose = () => {
        setOpen(false);
    };

    const showSuccessAlert = (message) => {
        setMessage(message);
        setSeverity('success');
        setOpen(true);
    };

    const showErrorAlert = (message) => {
        setMessage(message);
        setSeverity('error');
        setOpen(true);
    };

    const AlertComponent = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );

    return (
        <AlertContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
            {children}
            {AlertComponent}
        </AlertContext.Provider>
    );
};

export default AlertProvider;

AlertProvider.propTypes = {
    children: PropTypes.element,
};