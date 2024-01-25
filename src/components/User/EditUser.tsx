import React, { useState } from 'react';
import { IUser } from './User.type';
import "../User/UserForm.style.css";
import { useTranslation } from 'react-i18next';

type Props = {
    onBackBtnClickHnd :  () => void;
    data: IUser;
    onUpdateClickHnd :(data: IUser) => void;
}
const EditUser = (props: Props) => {

    const { data, onBackBtnClickHnd, onUpdateClickHnd} = props;

    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [place, setPlace] = useState(data.place);


    const onFirstNameChangeHnd = (e : any) => {
        setFirstName(e.target.value);
    };

    const onLastNameChangeHnd = (e : any) => {
        setLastName(e.target.value);
    };

    const onPlaceChangeHnd = (e : any) => {
        setPlace(e.target.value);
    };

    const onSubmitBtnClickHnd = (e: any) => {
        e.preventDefault();
        const UpdatedUser : IUser = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            place: place
        }
        if(UpdatedUser.firstName !== "" && UpdatedUser.lastName !== "" && UpdatedUser.place !== ""){
            onUpdateClickHnd(UpdatedUser);
            onBackBtnClickHnd();
        }
    };

    const { t } = useTranslation();
    
    return (
        <div className="form-container">
            <div>
                <h3>{t('editUser')}:</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div className="inputwrap">
                    <label>{t('firstName')}:</label>
                    <input type="text" value={firstName} onChange={onFirstNameChangeHnd} />
                </div>
                <div className="inputwrap">
                    <label>{t('lastName')} :</label>
                    <input type="text" value={lastName} onChange={onLastNameChangeHnd} />
                    <br />
                </div>
                <div className="inputwrap">
                    <label>{t('place')} :</label>
                    <input className="place" type="text" value={place} onChange={onPlaceChangeHnd} />
                </div>
                <div>
                    <input type="button" value={t('back')} onClick={onBackBtnClickHnd} />
                    <input type="submit" value={t('updateUser')} />
                    <br />
                </div>
            </form>
        </div>
    );

}

export default EditUser;