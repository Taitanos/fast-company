import React from "react";
import {ProfessionsTypeObject, ProfessionType} from "../../../api/fake.api/user.api";

type PropsType = {
    label?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    defaultOption: string
    options: Array<ProfessionType> | ProfessionsTypeObject | undefined | any
    error: string
    name: string
}

const SelectField: React.FC<PropsType> = ({label, value, onChange, defaultOption, options, error, name}) => {

    const getInputClasses = () => {
        return "form-select " + (value === "" ? "is-invalid" : "is-valid");
    }

    const optionsArray = !Array.isArray(options) && typeof options === "object" ?
        Object.keys(options).map(optionName => ({
            name: options[optionName].name,
            value: options[optionName]._id
        })) : options

    return (
        <div className={'mb-4'}>
            <label htmlFor={name} className={'form-label'}>{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option disabled value={''}>{defaultOption}</option>
                {
                    optionsArray && optionsArray.map((option: any) => <option
                            key={option.value}
                            value={option.value}>
                            {option.name}
                        </option>
                    )
                }
            </select>

            {error ?
                <div className={'invalid-feedback'}>
                    {error}
                </div> : <div className={'valid-feedback'}>Готово!</div>}
        </div>
    )
}

export default SelectField;