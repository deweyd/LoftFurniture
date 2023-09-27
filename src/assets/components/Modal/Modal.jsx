import './Modal.scss'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import firebase from 'firebase/compat/app';




function Modal({handleClose}) {
    const authorization = useFirebaseData('authorization');
    const initialEmail = authorization.map((item) => item.email);
    const initialPassword = authorization.map((item) => item.password);
    const [Id, setId] = useState('');
    const [mail, setMail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [userAuthorizations, setUserAuthorizations] = useState('65');
    const handleEnter = async () => {
        const filterAuthorizations = authorization.filter((user) => {
            return user.email === mail && user.password === password;
        });
        if(filterAuthorizations.length === 0){
            setError(true)
        }
        else {
            const userId = filterAuthorizations[0];
            const usersId = userId.id;
            setId(userId.id);
            handleClose();
            const database = firebase.database();
            const databaseRef = database.ref(`${'usersId'}/userId${usersId}`);
            const Id = usersId;
            databaseRef.child("id").set(Id)
                .then(() => {
                    console.log(`Id ${Id} успешно добавлен в Firebase.`);
                })
                .catch((error) => {
                    console.error(`Ошибка при добавлении Id ${Id} в Firebase:`, error);
                });
        }
        // const firstUserAuthorization = filteredUserAuthorizations[0];
        // const userId = firstUserAuthorization.id;
        // setUserAuthorizations(userId);
        console.log(Id)
    }
    console.log(Id)
    // const handleSignUp = async (e) => {
    //     e.preventDefault()
    //     const auth = getAuth();
    //     createUserWithEmailAndPassword(auth, mail, password)
    //         .then((userCredential) => {
    //             // Signed in
    //             const user = userCredential.user;
    //             console.log(user)
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             console.log(errorCode)
    //             const errorMessage = error.message;
    //             console.log(errorMessage)
    //             // ..
    //         });
    // };

// Вход пользователя
//     const handleSignIn = async (e) => {
//         e.preventDefault()
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, mail, password)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 console.log(user)
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 console.log(errorCode)
//                 const errorMessage = error.message;
//                 console.log(errorMessage)
//             });
//
//     };

// Выход пользователя
//     const handleSignOut = async (e) => {
//         e.preventDefault()
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             console.log()
//             // Sign-out successful.
//         }).catch((error) => {
//             // An error happened.
//         });
//     };

    const handleSubmit = (e) => {
      e.preventDefault()
    }


    return (
        <div className="modal">
            <div className="modal-content">
                <form className="contacts__left-block" onSubmit={handleSubmit}>
                    <div className="contacts__title">Я уже покупал</div>
                    <div className="contacts__input">
                        <label>Е-mail</label>
                        <input
                            type="email"
                            placeholder=""
                            value={mail}
                            name="email"
                            required
                            onChange={(e) => {setMail(e.target.value); setError(false);}}
                        />
                    </div>
                    <div className="contacts__input">
                        <label>Пароль</label>
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
                    {/*<Link to={userAuthorizations.length > 0 ? `/Cabinet/${userAuthorizations}` : '/Cabinet'} onClick={handleEnter}  className="contacts__button">Войти</Link>*/}
                    <button className="contacts__button" onClick={handleEnter} type="submit">Войти</button>
                    {/*<button onClick={handleSignUp}>Зарегистрироваться</button>*/}
                    {/*<button onClick={handleSignIn}>Войти</button>*/}
                    {/*<button onClick={handleSignOut}>Выйти</button>*/}
                </form>
                <div className="contacts__right-block">
                    <div className="contacts__title">Я новый клиент</div>
                    <div>Быстро, удобно и легко!</div>
                    <nav>
                        <ul>
                            <li>Отслеживайте статус заказа</li>
                            <li>Получайте лучшие предложения</li>
                            <li>Накапливайте бонусные баллы</li>
                            <li>Сохраняйте историю заказов</li>
                        </ul>
                    </nav>
                    <Link to="/Cabinet" onClick={handleClose} className="contacts__button">Зарегистрироваться</Link>
                </div>
                <button onClick={handleClose} className="close" type="button">&#x2715;</button>
            </div>
        </div>
    );
}

export default Modal;