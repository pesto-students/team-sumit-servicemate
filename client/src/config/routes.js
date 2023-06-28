import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ path, element }) => {
    const isAuthenticated = true; // Replace with your authentication logic

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Route path={path} element={element} />;
};


PrivateRoute.propTypes = {
    path: PropTypes.string,
    element: PropTypes.node,
};

export default PrivateRoute;

