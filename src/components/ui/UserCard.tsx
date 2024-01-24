import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

type PropsType = {
    user: any
}


const UserCard: React.FC<PropsType> = ({user}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClickEdit = () => {
        navigate(`${location.pathname}/edit`);
    }

    return (
        <div className={'card mb-3'}>
            <div className={'card-body'}>
                <button
                    className={'position-absolute top-0 end-0 btn btn-light btn-sm'}
                    onClick={handleClickEdit}
                >
                    <i className={'bi bi-gear'}></i>
                </button>
                <div className={'d-flex flex-column align-items-center text-center position-relative'}>
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg`}
                        className={'rounded-circle'}
                        width={'150'}
                        alt={'avatar'}
                    />
                    <div className={'mt-3'}>
                        <h4>{user.name}</h4>
                        <p className={'text-secondary mb-1'}>
                            {user.profession.name}
                        </p>
                        <div className={'text-muted'}>
                            <i
                                className={'bi bi-caret-down-fill text-primary'}
                                role={'button'}
                            ></i>
                            <i
                                className={'bi bi-caret-up text-secondary'}
                                role={'button'}
                            ></i>
                            <span className={'ms-2'}>{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;
