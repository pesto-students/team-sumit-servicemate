import React from 'react'
import LoginForm from './components/form'

const Login = () => {
    // const [formData, setFormData] = useSta
    const getFormData = (data) => {
        console.log("🚀 ~ file: index.js:7 ~ getFormData ~ data:", data)

    }
    return (
        <>
            <h1>Login</h1>
            <LoginForm getFormData={getFormData}></LoginForm>
        </>
    )
}

export default Login