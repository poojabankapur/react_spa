import React from 'react';
import "./UserModal.style.css";
import { IUser } from './User.type';
import { useTranslation } from 'react-i18next';
type Props = {
    onClose : () => void;
    data: IUser;
}


const UserModal = (props: Props) => {
    const { t } = useTranslation();

    const { onClose, data} = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>{t('userDetails')}:</h3>
                <div>
                    <div>
                        <label>{t('firstName')}: {data.firstName}</label>
                    </div>
                    <div>
                        <label>{t('lastName')}: {data.lastName}</label>
                    </div>
                    <div>
                        <label>{t('place')}: {data.place}</label>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default UserModal;