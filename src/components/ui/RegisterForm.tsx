import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {validator} from '../../utils/validator';
import TextField from '../common/form/TextField';
import api from '../../api';
import {ProfessionsTypeObject, ProfessionType} from '../../api/fake.api/user.api';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';

export type QualityType = {
    name: string
    value: string
}

export type LicenseType = {
    name: string
    value: boolean
}

type DataType = {
    [key: string]: string | any
    email: string
    password: string
    profession: string
    sex: string
    qualities: Array<QualityType>
    licence:boolean
}

function RegisterForm() {

    const [data, setData] = useState<DataType>({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false,
    })
    const [professions, setProfessions] = useState<undefined | ProfessionsTypeObject | ProfessionType[]>(undefined)
    const [qualities, setQualities] = useState({})
    const [errors, setErrors] = useState<any>({})

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
        api.qualities.fetchAll().then((data: any) => setQualities(data))
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
            isRequired: {message: 'Обязательно выберите вашу профессию'}
        },
        licence: {
            isRequired: {message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'}
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleChange = ({target}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}))
    }

    const handleMultiSelectChange = (target: QualityType) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }

    const handleCheckBoxChange = (target: LicenseType) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
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
                name={'profession'}
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
            <MultiSelectField
                options={qualities}
                onChange={handleMultiSelectChange}
                name={'qualities'}
                defaultValue={data.qualities}
                label={'Введите ваши качества'}
            />
            <CheckBoxField
                name={'licence'}
                value={data.licence}
                onChange={handleCheckBoxChange}
                error={errors.licence}
            >
                Подтвердите <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button className={'btn btn-primary w-100 mx-auto'} type={'submit'} disabled={!isValid}>Submit</button>
        </form>
    )
}

export default RegisterForm;