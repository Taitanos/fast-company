import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import SelectField from "../../common/form/SelectField";
import RadioField from "../../common/form/RadioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import {QualityType} from "../../ui/RegisterForm";
import {ProfessionType} from "../../../api/fake.api/user.api";
import api from "../../../api";
import {validator} from "../../../utils/validator";
import {QualitiesType} from "../../../api/fake.api/qualities.api";
import TextField from "../../common/form/TextField";


type DataType = {
    [key: string]: string | any
    email: string
    password: string
    profession: string
    sex: string
    qualities: Array<QualityType>
}

function EditUserPage () {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DataType>({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    })

    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState<QualitiesType | {} | any>({});
    const [errors, setErrors] = useState<any>({});

    const getProfessionById = (id: string) => {
        for (const prof in professions) {
            const profData: ProfessionType = professions[prof];
            if (profData._id === id) return profData;
        }
    }

    const getQualities = (elements: any) => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesQrray;
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data: any) => navigate(`/users/${data._id}`));
        console.log(data);
    }

    const transformData = (data: any) => {
        return data.map((qual: any) => ({ label: qual.name, value: qual._id }));
    }

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data: any) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(data.qualities),
                profession: data.profession._id
            }))
        );
        api.qualities.fetchAll().then((data: any) => setQualities(data));
        api.professions.fetchAll().then((data: any) => setProfession(data));
    }, [])

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => {
        validate()
    }, [data])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleMultiSelectChange = (target: QualityType) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }

    const handleInputChange: React.ChangeEventHandler<HTMLSelectElement> = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className={'container mt-5'}>
            <div className={'row'}>
                <div className={'col-md-6 offset-md-3 shadow p-4'}>
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label={'Электронная почта'}
                                name={'email'}
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label={'Выбери свою профессию'}
                                defaultOption={'Choose...'}
                                options={professions}
                                onChange={handleInputChange}
                                value={data.profession}
                                error={errors.profession}
                                name={'profession'}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name={'sex'}
                                onChange={handleChange}
                                label={'Выберите ваш пол'}
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleMultiSelectChange}
                                values
                                name={'qualities'}
                                label={'Выберите ваши качества'}
                            />
                            <button
                                type={'submit'}
                                disabled={!isValid}
                                className={'btn btn-primary w-100 mx-auto'}
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage;