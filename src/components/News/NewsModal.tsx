import React from 'react';
import { useTranslation } from 'react-i18next';
import { INews } from './News.type';
type Props = {
    onClose : () => void;
    data: INews;
}


const NewsModal = (props: Props) => {
    const { t } = useTranslation();

    const { onClose, data} = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>{t('newsDetails')}:</h3>
                <div>
                    <div>
                        <label>{t('newsTitle')}: {data.title}</label>
                    </div>
                    <div>
                        <label>{t('description')}: {data.description}</label>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default NewsModal;