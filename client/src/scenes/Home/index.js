import React, { useEffect } from 'react'
import { useLocation, } from 'react-router-dom'
import { data } from '../../config/db'
import routeConstant from '../../config/routeConstant'
import { connect } from 'react-redux';
import { someAction } from './actions';
import PropTypes from "prop-types";

const Home = (props) => {
    const { someData, dispatchSomeAction } = props
    const location = useLocation()
    console.log("someData", someData)
    useEffect(() => {
        const { navigatedFrom, userDetails } = location?.state || {}
        if (navigatedFrom === routeConstant.register && userDetails) {
            const loggedInUser = data.users.find(user => user.emailId === userDetails.emailId)
            if (loggedInUser) {
                console.log("log", loggedInUser)
            }
            console.log("🚀 ~ file: index.js:10 ~ useEffect ~ data.users:", data.users)
        }
        dispatchSomeAction()

    }, [])

    return (
        <h1>
            Home
        </h1>
    )
}

const mapStateToProps = (state) => {
    return {
        someData: state.someData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSomeAction: () => dispatch(someAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
    someData: PropTypes.object,
    dispatchSomeAction: PropTypes.func,
}