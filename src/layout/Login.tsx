import React, {useState} from 'react';
import LoginForm from '../components/ui/LoginForm';
import {useParams} from 'react-router-dom';
import RegisterForm from '../components/ui/RegisterForm';


function Login() {
    const {type} = useParams();
    const [formType, setFormType] = useState(type === 'register' ? type : 'login');

    const toggleFormType = () => {
        setFormType(prevState => prevState === 'register' ? 'login' : 'register')
    }

    return (
        <div className={'container mr-5'}>
            <div className={'row'}>
                <div className={'col-md-6 offset-md-3 p-4 shadow'}>
                    {formType === 'register'
                        ? <>
                            <h3 className={'mb-4'}>Register</h3>
                            <RegisterForm/>
                            <p>Already have account?<a role={'button'} onClick={toggleFormType}> Sign In</a></p>
                        </>
                        : <>
                            <h3 className={'mb-4'}>Login</h3>
                            <LoginForm/>
                            <p>Don't have account?<a role={'button'} onClick={toggleFormType}> Sign Un</a></p>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Login;