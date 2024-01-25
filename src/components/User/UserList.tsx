import React, { useState } from 'react';
import "./UserList.style.css";
import { IUser } from './User.type';
import { useTranslation } from 'react-i18next';
import UserModal from './UserModal';

type Props = {
    list: IUser[];
    onDeleteClickHnd: (data: IUser) => void;
    onEdit: (data: IUser) => void;
}
const UserList = (props: Props) => {
    const { list, onDeleteClickHnd , onEdit} = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IUser | null);

    const viewUser = (data:IUser) => {
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
                <h3 className="list-header">{t('userList')}</h3>
            </article>
            <table>
                <tr>
                    <th>{t('name')}</th>
                    <th>{t('place')}</th>
                    <th>{t('action')}</th>
                </tr>
                {list.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.place}</td>
                             <td>
                                <div>
                                    <input type="button" value={t('view')} onClick={() => viewUser(user)} className="button" />
                                    <input type="button" value={t('edit')} onClick={() => onEdit(user)} className="button" />
                                    <input type="button" value={t('delete')} onClick={() => onDeleteClickHnd(user)} className="button" />
                                </div>
                             </td>
                        </tr>
                    )
                })
                }
            </table>
            {showModal && dataToShow !=null && (
                <UserModal onClose={onCloseModal} data={dataToShow}/>)
            }
    </div>
    );
};

export default UserList;