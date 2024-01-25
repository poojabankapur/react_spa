// UserDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from './User.type';
import { useTranslation } from 'react-i18next';
import "../User/User.style.css";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    place: string;
}

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUser | null>(null);
    const [selectedValue, setSelectedValue] = useState('');
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const handleDropdownChange = (e: any) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        changeLanguage(newValue);
    };

    useEffect(() => {
        // Retrieve users from localStorage
        const users: User[] = JSON.parse(localStorage.getItem('UserList') || '[]');

        // Find the user with the matching id
        const foundUser = users.find((u) => u.id === id);

        if (foundUser) {
            setUser(foundUser);
        }
    }, [id]);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>
            <section className="section-content">
                <div className="language">
                    <label>{t('chooseLanguage')}:</label>
                    <select id="languages" name="Language" value={selectedValue} onChange={handleDropdownChange}>
                        <option value="en" >English</option>
                        <option value="es" >Spanish</option>
                    </select>
                </div>
                <div>
                    <h1>{t('userDetails')}</h1>
                    <p>ID: {user.id}</p>
                    <p>{t('firstName')}: {user.firstName}</p>
                    <p>{t('lastName')}: {user.lastName}</p>
                    <p>{t('place')}: {user.place}</p>
                    {/* Display more user details */}
                </div>
            </section>
        </>
    );
};

export default UserDetails;
