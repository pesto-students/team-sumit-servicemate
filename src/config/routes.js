import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, }) {
    const { authUser } = useSelector(state => state.user)
    return authUser ? (
        children
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;