import React, { useEffect, useState } from 'react';
import "../User/User.style.css";
import { IUser, PageEnum } from './User.type';
import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useTranslation } from 'react-i18next';


const User = () => {
    const [userList, setUserList] = useState([] as IUser[]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [DataToEdit, setDataToEdit] = useState({} as IUser);
    const [selectedValue, setSelectedValue] = useState('');
    const { i18n } = useTranslation();

    useEffect(() => {
        const listInString = window.localStorage.getItem("UserList");
        if (listInString) {
            _setUserList(JSON.parse(listInString));
        }
    }, [])

    const _setUserList = (list: IUser[]) => {
        setUserList(list)
        window.localStorage.setItem("UserList", JSON.stringify(list));
    };

    const onAddUserClickHnd = () => {
        setShownPage(PageEnum.add);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
    };

    const addUser = (data: IUser) => {
        _setUserList([...userList, data]);
    };

    const deleteUser = (data: IUser) => {
        const indexToDelete = userList.indexOf(data);
        const tempList = [...userList];

        tempList.splice(indexToDelete, 1);
        _setUserList(tempList);
    };

    const editUserData = (data: IUser) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(data);

    };

    const updateUserData = (data: IUser) => {
        const filteredUserData = userList.filter(x => x.id === data.id)[0];
        const indexOfUser = userList.indexOf(filteredUserData);
        const tempData = [...userList];
        tempData[indexOfUser] = data;
        _setUserList(tempData);
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
                        <input type="button" value={t('addUser')} onClick={onAddUserClickHnd} className="add-user-btn" />
                        <div className="language">
                            <label>{t('chooseLanguage')}:</label>
                            <select id="languages" name="Language" value={selectedValue} onChange={handleDropdownChange}>
                                <option value="" >Select Language</option>
                                <option value="en" >English</option>
                                <option value="es" >Spanish</option>
                            </select>
                        </div>
                        <UserList list={userList} onDeleteClickHnd={deleteUser} onEdit={editUserData} />
                    </>
                )}

                {shownPage === PageEnum.add && <AddUser onBackBtnClickHnd={showListPage} onSubmitClickHnd={addUser} />}

                {shownPage === PageEnum.edit && <EditUser data={DataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateUserData} />}

            </section>
        </>
    );
};

export default User;