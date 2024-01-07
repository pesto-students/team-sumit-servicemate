import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const NotificationSnackBar = ({ message = 'invalid data entered', variant = 'outlined', severity = 'error', open = false, hideDuration = 3000, handleClose = () => { },
    vertical = 'bottom', horizontal = 'right' }) => {
    return (
        <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert variant={variant} severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};
export default NotificationSnackBar;

NotificationSnackBar.propTypes = {
    message: PropTypes.string,
    variant: PropTypes.string,
    severity: PropTypes.string,
    open: PropTypes.bool,
    hideDuration: PropTypes.number,
    handleClose: PropTypes.func,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
};