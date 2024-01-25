import React, { useState } from 'react';
import { INews } from './News.type';
import "../User/UserForm.style.css";
import { useTranslation } from 'react-i18next';

type Props = {
    onBackBtnClickHnd :  () => void;
    onSubmitClickHnd : (data : INews) => void;
};

const AddNews = (props : Props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const index = 0;

    const {onBackBtnClickHnd, onSubmitClickHnd} = props;

    const onTitleChangeHnd = (e : any) => {
        setTitle(e.target.value);
    };

    const onDescriptionChangeHnd = (e : any) => {
        setDescription(e.target.value);
    };

    const onSubmitBtnClickHnd = (e: any) => {
        e.preventDefault();
        
        const data : INews = {
            id: index + 1, 
            title: title,
            description: description,
        }
        if(data.title !== "" && data.description !== ""){
            onSubmitClickHnd(data);
            onBackBtnClickHnd();
        }
    };

    const { t } = useTranslation();

    return (
        <div className="form-container">
            <div>
                <h3>{t('addNewsForm')}</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div className="inputwrap">
                    <h5 className="newsFields">{t('allFieldsAreMandatory')}*</h5>
                    <label>{t('newsTitle')} :</label>
                    <input type="text" value={title} onChange={onTitleChangeHnd}/>
                </div>
                <div className="inputwrap">
                    <label>{t('description')} :</label>
                    <input type="text" value={description} onChange={onDescriptionChangeHnd}/>
                    <br/>
                </div>
                <div>
                    <input type="button" value={t('back')} onClick={onBackBtnClickHnd} />
                    <input type="submit" value={t('addNews')} />
                    <br/>
                </div>
            </form>
        </div>
    )
}

export default AddNews;