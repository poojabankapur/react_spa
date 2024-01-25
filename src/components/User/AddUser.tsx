import React, { useState } from 'react';
import "../User/UserForm.style.css";
import { IUser } from './User.type';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    onBackBtnClickHnd :  () => void;
    onSubmitClickHnd : (data : IUser) => void;
};

const AddUser = (props : Props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [place, setPlace] = useState("");

    const {onBackBtnClickHnd, onSubmitClickHnd} = props;

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
        const uniqueUserId:string = uuidv4();
        const data : IUser = {
            id: uniqueUserId,
            firstName: firstName,
            lastName: lastName,
            place: place
        }
        console.log("id is");
        console.log(data.id);
        if(data.firstName !== "" && data.lastName !== "" && data.place !== ""){
            onSubmitClickHnd(data);
            onBackBtnClickHnd();
        }
    };

    const { t } = useTranslation();

    return (
        <div className="form-container">
            <div>
                
                <h3>{t('addUserForm')}</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div className="inputwrap">
                    <h5 className="userFields">{t('allFieldsAreMandatory')}*</h5>
                    <label>{t('firstName')} :</label>
                    <input type="text" value={firstName} onChange={onFirstNameChangeHnd}/>
                </div>
                <div className="inputwrap">
                    <label>{t('lastName')} :</label>
                    <input type="text" value={lastName} onChange={onLastNameChangeHnd}/>
                    <br/>
                </div>
                <div className="inputwrap">
                    <label>{t('place')} :</label>
                    <input className="place" type="text" value={place} onChange={onPlaceChangeHnd}/>
                </div>
                <div>
                    <input type="button" value={t('back')} onClick={onBackBtnClickHnd} />
                    <input type="submit" value={t('addUser')} />
                    <br/>
                </div>
            </form>
        </div>
    )
}

export default AddUser;