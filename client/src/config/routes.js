import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children, isAuthenticated = false }) {
    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
    isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;