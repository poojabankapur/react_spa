import React,{ useState } from "react";
import { INews } from "./News.type";
import { useTranslation } from "react-i18next";
import NewsModal from "./NewsModal";
type Props = {
    list: INews[];
    onDeleteClickHnd: (data: INews) => void;
}

const NewsList = (props: Props) => {
    const { list, onDeleteClickHnd} = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as INews | null);

    const viewNews = (data:INews) => {
        setDataToShow(data);
        setShowModal(true); 
    };

    const onCloseModal = () => {
        setShowModal(false);
    };

    const { t } = useTranslation();

    return (
    <div>
            <article>
                <h3 className="list-header">{t('newsList')}</h3>
            </article>
            <table>
                <tr>
                    <th>{t('newsTitle')}</th>
                    <th>{t('description')}</th>
                    <th>{t('action')}</th>
                </tr>
                {list.map((news) => {
                    return (
                        <tr key={news.id}>
                            <td>{`${news.title}`}</td>
                            <td>{`${news.description}`}</td>
                             <td>
                                <div>
                                    <input type="button" value={t('view')} onClick={() => viewNews(news)}/>
                                    <input type="button" value={t('delete')} onClick={() => onDeleteClickHnd(news)}/>
                                </div>
                             </td>
                        </tr>
                    )
                })
                }
            </table>
            {showModal && dataToShow !=null && (
                <NewsModal onClose={onCloseModal} data={dataToShow}/>)
            }
    </div>
    );
};

export default NewsList;