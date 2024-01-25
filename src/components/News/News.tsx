import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INews, PageEnum } from './News.type';
import "./NewsList.style.css";
import NewsList from './NewsList';
import AddNews from './AddNews';

const News = () => {
    const [newsList, setNewsList] = useState([] as INews[]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [selectedValue, setSelectedValue] = useState('');
    const { i18n } = useTranslation();

    useEffect(() => {
        const listInString = window.localStorage.getItem("NewsList");
        if (listInString) {
            _setNewsList(JSON.parse(listInString));
        }
    }, [])

    const _setNewsList = (newslist: INews[]) => {
        setNewsList(newslist)
        window.localStorage.setItem("NewsList", JSON.stringify(newslist));
    };

    const onAddNewsClickHnd = () => {
        setShownPage(PageEnum.add);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
    };

    const addNews = (data: INews) => {
        _setNewsList([...newsList, data]);
    };

    const deleteNews = (data: INews) => {
        const indexToDelete = newsList.indexOf(data);
        const tempList = [...newsList];

        tempList.splice(indexToDelete, 1);
        _setNewsList(tempList);
    };

    const { t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleDropdownChange = (e: any) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        changeLanguage(newValue);
    };

    return (
        <>
            <section className="section-content">
                {shownPage === PageEnum.list && (
                    <>
                        <input type="button" value={t('addNews')} onClick={onAddNewsClickHnd} className="add-user-btn" />
                        <div className="language">
                            <label>{t('chooseLanguage')}:</label>
                            <select id="languages" name="Language" value={selectedValue} onChange={handleDropdownChange}>
                                <option value="" >Select Language</option>
                                <option value="en" >English</option>
                                <option value="es" >Spanish</option>
                            </select>
                        </div>
                        <NewsList list={newsList} onDeleteClickHnd={deleteNews}/>
                    </>
                )}
                {shownPage === PageEnum.add && <AddNews onBackBtnClickHnd={showListPage} onSubmitClickHnd={addNews} />}

            </section>
        </>
    );
};

export default News;