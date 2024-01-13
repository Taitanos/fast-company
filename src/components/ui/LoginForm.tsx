import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {validator} from '../../utils/validator.js';
import TextField from '../common/form/TextField';

type PropsType = {
    email: string
    password: string
}

export type ErrorsType = {
    [key: string]: string
}

function LoginForm () {

    const [data, setData] = useState<PropsType>({email: '', password: ''})
    const [errors, setErrors] = useState<ErrorsType>({})

    useEffect(() => {
        validate()
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {message: "Электронная почта обязательная для заполнения"},
            isEmail: {message:"Электронная почта введена некорректно"}
        },
        password: {
            isRequired: {message: "Пароль обязательная для заполнения"},
            isCapitalSymbol: {message: "Пароль должен содержать хотя бы одну заглавную букву"},
            isContainDigit: {message: "Пароль должен содержать хотя бы одну цифру"},
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8,
            },
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <div className={"container mr-5"}>
            <div className={"row"}>
                <div className={"col-md-6 offset-md-3 p-4 shadow"}>
                    <h3 className={"mb-4"}> Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField label={'email'} type={'text'} name={'email'} value={data.email} onChange={handleChange} error={errors.email}/>
                        <TextField label={'password'} type={'password'} name={'password'} value={data.password} onChange={handleChange} error={errors.password}/>
                        <button className={"btn btn-primary w-100 mx-auto"} type={'submit'} disabled={!isValid}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;