import './ModalAdmin.scss'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import firebase from 'firebase/compat/app';




function ModalAdmin({handleClose}) {
    const admin = useFirebaseData('admin');
    const [Id, setId] = useState('');
    const [login, setLogin] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const filterAuthorizations = admin.filter((user) => {
        console.log(user)
        return user.login === login && user.password === password;
    });
    console.log(filterAuthorizations)
    const handleEnter = async () => {
        const filterAuthorizations = admin.filter((user) => {
            return user.login === login && user.password === password;
        });
        console.log(filterAuthorizations)
        if(filterAuthorizations.length === 0){
            setError(true)
        }
        else {
            const userId = filterAuthorizations[0];
            const usersId = userId.id;
            setId(userId.id);
            handleClose();
            const database = firebase.database();
            const databaseRef = database.ref(`${'usersIdAdmin'}/userId${usersId}`);
            const Id = usersId;
            databaseRef.child("id").set(Id)
                .then(() => {
                    console.log(`Id ${Id} успешно добавлен в Firebase.`);
                })
                .catch((error) => {
                    console.error(`Ошибка при добавлении Id ${Id} в Firebase:`, error);
                });
        }
        console.log(Id)
    }
    console.log(Id)

    const handleSubmit = (e) => {
      e.preventDefault()
    }


    return (
        <div className="modal modal-admin">
            <div className="modal-content">
                <form className="contacts__left-block" onSubmit={handleSubmit}>
                    <div className="contacts__title">Вход администратора</div>
                    <div className="contacts__input">
                        <label>Логин (введите admin)</label>
                        <input
                            type="text"
                            placeholder=""
                            value={login}
                            name="login"
                            required
                            onChange={(e) => {setLogin(e.target.value); setError(false);}}
                        />
                    </div>
                    <div className="contacts__input">
                        <label>Пароль (введите admin)</label>
                        <input
                            type="password"
                            placeholder=""
                            value={password}
                            name="password"
                            required
                            onChange={(e) => {setPassword(e.target.value); setError(false);}}
                        />
                    </div>
                    {error ? <div className="error">неправильный логин или пароль</div> : null}
                    <button className="contacts__button" onClick={handleEnter} type="submit">Войти</button>
                </form>
                <button onClick={handleClose} className="close" type="button">&#x2715;</button>
            </div>
        </div>
    );
}

export default ModalAdmin;