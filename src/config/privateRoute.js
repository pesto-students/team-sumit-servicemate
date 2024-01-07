import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import routes from './routeConstants';

function PrivateRoute({ children, }) {
    const { authUser } = useSelector(state => state.user);
    return authUser ? (
        children
    ) : (
        <Navigate to={routes.LOGIN} replace={true} />
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;