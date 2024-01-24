import React, {useEffect, useState} from "react";
import SelectField from "../form/SelectField";
import {validator} from "../../../utils/validator";
import API from "../../../api";
import TextAreaField from "../form/TextAreaField";

const initialData = {userId: "", content: ""};

type PropsType = {
    onSubmit: (data: any) => void
}

const AddCommentForm: React.FC<PropsType> = ({onSubmit}) => {
    const [data, setData] = useState<any>(initialData);
    const [users, setUsers] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    const handleChange = (target: any) => {
        setData((prevState: any) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleInputChange: React.ChangeEventHandler<HTMLSelectElement> = ({target}) => {
        setData((prevState: any) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfog = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfog);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleInputChange}
                    options={arrayOfUsers}
                    name={'userId'}
                    value={data.userId}
                    defaultOption={'Выберите пользователя'}
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name={'content'}
                    label={'Сообщение'}
                    error={errors.content}
                />
                <div className={'d-flex justify-content-end'}>
                    <button className={'btn btn-primary'}>Опубликовать</button>
                </div>
            </form>
        </div>
    )
}

export default AddCommentForm;
