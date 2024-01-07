import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    label: string
    type: string
    name: string
    value: string
    error: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function TextField({label, type, name, value, error, onChange}: PropsType) {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }

    return (
        <div className={'mb-4'}>
            <label htmlFor={name}>{label}</label>
            <div className={'input-group has-validation'}>
                <input className={getInputClasses()} type={showPassword ? 'text' : type} id={name} name={name}
                       value={value}
                       onChange={onChange}/>
                {type === 'password' && (
                    <button className={'btn btn-outline-secondary'} type={'button'}
                            onClick={toggleShowPassword}>
                        <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}/>
                    </button>
                )}
                {error && <div className={'invalid-feedback'}>{error}</div>}
            </div>
        </div>
    )
}

export default TextField;