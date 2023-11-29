import React, { Component } from 'react';
import PropTypes from "prop-types"
import PageNotFound from '../PageNotFound';
class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    componentDidCatch(error, info) {
        // You can log the error here or send it to a logging service
        console.error(error, info);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // Return your fallback UI here
            return (
                <PageNotFound message="Something went wrong, please try again after sometime." description=' '></PageNotFound>
            );
        }
        return this.props.children;
    }
}

export default ErrorPage;

ErrorPage.propTypes = {
    children: PropTypes.node,
}