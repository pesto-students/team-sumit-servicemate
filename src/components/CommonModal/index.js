import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CommonModal = (props) => {
    const { open = false, handleClose, title = '', description = '', actions = [], children } = props;
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> {description}</Typography>
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                {actions.map((action, index) => (
                    <Button key={'action-' + index} onClick={action.onClick} color={action.color}>
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default CommonModal;

CommonModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.element,
};