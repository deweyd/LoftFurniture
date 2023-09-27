import { Link } from "react-router-dom";
import './Users.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import { useEffect, useState } from "react";
import Modal from "../Modal/index.jsx";
import firebase from 'firebase/compat/app';


function Users() {
    const [isClick, setIsClick] = useState(false);
    const collectionName = 'basket';
    const basket = useFirebaseData(collectionName);
    const usersId = useFirebaseData('usersId');
    const authorization = useFirebaseData('authorization');
    console.log(authorization)

    console.log(authorization)
    const [autho, setAutho] = useState(authorization);
    const [lasId, setLasId] = useState('');
    console.log(autho && autho.basket ? autho.basket.length : 0);
    console.log(autho)
    // let count = 0;
    // Object.keys(autho).forEach((key) => {
    //     const value = autho[key];
    //     console.log(`Свойство: ${key}, Значение: ${value}`);
    //     count++;
    // });
    // console.log(count)
    const authoArray = Object.values(autho || {});


    useEffect(() => {
        if (usersId) {
            const newFount = authorization.filter((item) => item.id === lasId);
            if (newFount.length > 0) {
                setAutho(newFount[0].basket);
            }
        }
    }, [lasId, authorization]);

    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id;
        });
        const resultString = mappedArray.join(', ')
        setLasId(resultString);
    }, [usersId]);
    console.log(lasId)
    console.log(autho)

    const handleClick = (e) => {
        e.preventDefault()
        setIsClick(true);
    };

    const handleClose = () => {
        setIsClick(false);
    };
    
    const handleGoOut = () => {
        const database = firebase.database();
        const itemRefToRemove = database.ref(`${'usersId'}/userId${lasId}`);
        itemRefToRemove.remove()
            .then(() => {
                console.log('Объект успешно удален из базы данных.');
            })
            .catch((error) => {
                console.error('Ошибка при удалении объекта из базы данных: ', error);
            });
    }

    useEffect(() => {
        console.log("hello")
    }, [basket])

    return (
        <div className={`users ${isClick ? 'active' : ''}`}>
            <Link to="/Basket" className="basket-">
                {(basket.length !== 0 && <span>{basket.length}</span>) || (authoArray.length > 0 && <span>{authoArray.length}</span>
                )}
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/newproject-9cd70.appspot.com/o/bag.svg?alt=media&token=43d4dfc4-5211-4e72-8d15-f6502d5bdd2a"
                    alt=""
                />
            </Link>
            <Link to="" onClick={usersId.length === 0  ? handleClick : null} className={usersId.length === 0 ? "user" : "user active"}>
                {usersId.length !== 0 ?
                    <img src="https://firebasestorage.googleapis.com/v0/b/newproject-9cd70.appspot.com/o/profile-icon12.svg?alt=media&token=af31aac3-2dd4-4c59-8bd6-71790a73956e"/> :
                    <img src="https://firebasestorage.googleapis.com/v0/b/newproject-9cd70.appspot.com/o/profile-icon.svg?alt=media&token=0d7147e0-24ee-4c08-bc54-127fac3c585b" alt=""/>
                }
                <div className='user__menu'>
                    <Link to="/Cabinet">Личный кабинет</Link>
                    <Link onClick={handleGoOut} to="">Выйти из кабинета</Link>
                </div>
            </Link>

            <Modal handleClose={handleClose} />
        </div>
    );
}

export default Users;