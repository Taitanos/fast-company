import React from 'react';

type PropsType = {
    label: string
    options: any
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

function RadioField({label, options, name, onChange, value}: PropsType) {
    return (
        <div className={'mb-4'}>
            <label className={'form-label'}>
                {label}
            </label>
            <div>
                {options.map((option: any) => (
                    <div key={option.name + "_" + option.value} className={'form-check form-check-inline'}>
                        <input
                            className={'form-check-input'}
                            type={'radio'}
                            name={name}
                            id={option.name + "_" + option.value}
                            checked={option.value === value}
                            value={option.value}
                            onChange={onChange}
                        />
                        <label className={'form-check-label'}
                               htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RadioField;