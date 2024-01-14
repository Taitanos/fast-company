import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {validator} from '../../utils/validator.js';
import TextField from '../common/form/TextField';
import {ErrorsType} from './LoginForm';
import api from '../../api';
import {ProfessionsTypeObject, ProfessionType} from '../../api/fake.api/user.api';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';

type DataType = {
    [key: string]: string | any
    email: string
    password: string
    profession: string
    sex: string
}

function RegisterForm() {

    const [data, setData] = useState<DataType>({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
    })
    const [professions, setProfessions] = useState<undefined | ProfessionsTypeObject | ProfessionType[]>(undefined)
    const [errors, setErrors] = useState<ErrorsType>({})

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    useEffect(() => {
        validate()
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {message: 'Электронная почта обязательная для заполнения'},
            isEmail: {message: 'Электронная почта введена некорректно'}
        },
        password: {
            isRequired: {message: 'Пароль обязательная для заполнения'},
            isCapitalSymbol: {message: 'Пароль должен содержать хотя бы одну заглавную букву'},
            isContainDigit: {message: 'Пароль должен содержать хотя бы одну цифру'},
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8,
            },
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={'email'}
                type={'text'}
                name={'email'}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={'password'}
                type={'password'}
                name={'password'}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label={'Выберите вашу профессию'}
                value={data.profession}
                defaultOption={'Choose...'}
                options={professions}
                error={errors.profession}
                onChange={handleChange}
            />
            <RadioField
                label={'Выберите ваш пол'}
                options={[
                    {name: 'Male', value: 'male'},
                    {name: 'Female', value: 'female'},
                    {name: 'Other', value: 'other'},
                ]}
                value={data.sex}
                name={'sex'}
                onChange={handleChange}
            />
            <button className={'btn btn-primary w-100 mx-auto'} type={'submit'} disabled={!isValid}>Submit</button>
        </form>
    )
}

export default RegisterForm;