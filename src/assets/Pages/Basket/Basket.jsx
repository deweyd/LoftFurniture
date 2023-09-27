import './Basket.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import firebase from 'firebase/compat/app';
import {useEffect, useState} from "react";
import BasketItem from "../../components/BasketItem/index.jsx";




function Basket() {
    const collectionName = 'basket';
    const basket = useFirebaseData(collectionName);
    const usersId = useFirebaseData('usersId');
    const [lasId, setLasId] = useState('');
    const [mail, setMail] = useState('');
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    console.log(mail)
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id;
        });
        const resultString = mappedArray.join(', ')
        setLasId(resultString);
    }, [usersId]);
    const collectionNameBasket = 'basket';
    const basketData = useFirebaseData(collectionNameBasket);
    const collectionNameOrder = 'order';
    const collectionName1 = 'authorization';
    const authorization = useFirebaseData('authorization');
    console.log(usersId)
    const [autho, setAutho] = useState(authorization);
    const [authoChange, setAuthoChange] = useState(false);
    console.log(usersId)
    const authoArray = Object.values(autho || {});
    console.log(authoChange)
    useEffect(() => {
        if (usersId) {
            const newFount = authorization.filter((item) => item.id === lasId);
            console.log(newFount)
            if (newFount.length > 0) {
                setAuthoChange(true);
                setAutho(newFount[0].basket);
                setName(newFount[0].name)
                setMail(newFount[0].phone)
            }
            else {
                setAuthoChange(true);
            }
        }

    }, [lasId, authorization, basket]);

    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id;
        });
        const resultString = mappedArray.join(', ')
        setLasId(resultString);
    }, [usersId]);
    const [baskets, setBaskets] = useState([]);
    const [counts, setCounts] = useState({});
    const [count, setCount] = useState({});



    useEffect(() => {
        const entries = Object.entries(counts);
        const arr = Array.from(entries, ([key, value]) => ({ key, value }));
        setCount(arr);
    }, [counts]);
    const [show, setShow] = useState(true);
    // const localStorageData = localStorage.getItem('basket');
    // const data = JSON.parse(localStorageData);
    // console.log(data)
    console.log(autho)
    useEffect(() => {
        setBaskets(basket);
    }, [basket]);

    // Обработчик удаления элемента
    const handleDelete = (item) => {
        const database = firebase.database();
        // const itemRef = database.ref(`${collectionName}/${item.id}`);
        const basketRef = database.ref(usersId.length === 0 ? `${collectionName}/${item.id}`: `${collectionName1}/${lasId}/basket/${item.id}`);
        basketRef.remove()
            .then(() => {
                console.log(`Элемент с ID ${item.id} удален из Firebase.`);
                // Обновите состояние корзины, удалив элемент из baskets
                setBaskets((prevBaskets) => prevBaskets.filter((basketItem) => basketItem.id !== item.id));
            })
            .catch((error) => {
                console.error(`Ошибка при удалении элемента с ID ${item.id}: ${error}`);
            });
    };

    console.log(authoArray)

    const handleIncrement = (itemId) => {
        console.log(itemId)
        setCounts((prevCounts) => ({
            ...prevCounts,
            [itemId]: (prevCounts[itemId] || 1) + 1,
        }));
    };
    const handleDecrement = (itemId) => {
        setCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            if (updatedCounts[itemId] > 0) {
                updatedCounts[itemId] -= 1;
            }
            return updatedCounts;
        });
    };
    const [initialCountsSet, setInitialCountsSet] = useState(false);
    useEffect(() => {
        if (!initialCountsSet && authoArray.length > 0) {
            const initialCounts = {};
            authoArray.forEach((item) => {
                initialCounts[item.id] = 1; // Устанавливаем начальное значение 1 для каждого товара
            });
            console.log(initialCounts);
            setCounts(initialCounts);
            setInitialCountsSet(true);
        }
        if (!initialCountsSet && baskets.length > 0) {
            const initialCounts = {};
            baskets.forEach((item) => {
                initialCounts[item.id] = 1; // Устанавливаем начальное значение 1 для каждого товара
            });
            console.log(initialCounts);
            setCounts(initialCounts);
            setInitialCountsSet(true);
        }
        if (authoChange) {
            // Переинициализировать counts, если authoArray изменился
            if(authoArray && authoArray.length > 0){
                const updatedCounts = {};
                authoArray.forEach((item) => {
                    updatedCounts[item.id] = counts[item.id] || 1; // Сохраняем существующие значения, если они есть
                });
                console.log(updatedCounts);
                setCounts(updatedCounts);
                setAuthoChange(false); // Сбрасываем флаг изменения authoArray
            }
            else{
                const updatedCounts = {};
                baskets.forEach((item) => {
                    updatedCounts[item.id] = counts[item.id] || 1; // Сохраняем существующие значения, если они есть
                });
                console.log(updatedCounts);
                setCounts(updatedCounts);
                setAuthoChange(false); // Сбрасываем флаг изменения authoArray
            }

        }
    }, [authoArray, initialCountsSet, baskets]);

    console.log(counts)

    const handleOrder = () => {
        setShow(false);
        const orderCollectionRef = firebase.database().ref(collectionNameOrder);
        const orderCollectionRef1 = firebase.database().ref(usersId.length === 0 ? collectionNameOrder : `${collectionName1}/${lasId}/order`);
        console.log(`orderCollectionRef1: ${orderCollectionRef1.toString()}`)
        orderCollectionRef1.once('value').then((snapshot) => {
            const itemCount = snapshot.numChildren();
            const newFolderName = `order${itemCount + 1}`;
            const newOrderCollectionRef = orderCollectionRef1.child(newFolderName);
            console.log(newOrderCollectionRef)
            console.log(`orderCollectionRef1: ${newOrderCollectionRef.toString()}`)

            const newData = usersId.length === 0 ? basketData : authoArray;
            newData.number = count;
            newData.name = name;
            newData.email = mail;
            newOrderCollectionRef.set(newData)
                .then(() => {
                    console.log('Data from basket added to order successfully.');
                    // Удалить с корзины
                    const basketCollectionRef = firebase.database().ref(usersId.length === 0 ? collectionNameBasket : `${collectionName1}/${lasId}/basket`);
                    basketCollectionRef.remove()
                        .then(() => {
                            console.log('Basket data removed successfully.');
                        })
                        .catch((error) => {
                            console.error('Error removing basket data: ', error);
                        });
                })
                .catch((error) => {
                    console.error('Error adding data to the order: ', error);
                });
        });
    };
    function handleSubmit(e) {
        e.preventDefault()

        if (name && isValidPhoneNumber(mail)){
            handleOrder();
        } else {
            setError(true);
        }
    }

    function isValidPhoneNumber(phone) {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phone);
    }
    return (
        <div className="content basket">
            {
                show ? (
                        baskets.length > 0 || authoArray.length > 0 ? (
                            <div>
                                <div className="basket__title">Ваша корзина</div>
                                { (baskets.length > 0 ? baskets : authoArray).map((item, index) => (
                                    <div key={index}>
                                        <div className="basket__item">
                                            <div className="basket__main">
                                                <div className="basket__img">
                                                    <img src={item.img} alt=""/>
                                                </div>
                                                <div className="basket__subtitle">
                                                    {item.title}
                                                </div>
                                                <div className="basket__num">
                                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                                    Количество: {counts[item.id] || 1 }
                                                    <button onClick={() => handleIncrement(item.id)}>+</button>
                                                </div>
                                            </div>
                                            <div className="basket__price">
                                                Цена: {parseInt(item.price.replace(/\s+/g, '')) * (counts[item.id] || 1)} грн.
                                            </div>
                                            <button onClick={() => handleDelete(item)} className="basket__dell"><span>удалить</span></button>
                                        </div>
                                    </div>
                                ))}
                                <div className="basket__total">Итоговая стоимость: {(baskets.length > 0 ? baskets : authoArray).reduce((accumulator, item) => {
                                    const itemCost = parseInt(item.price.replace(/\s+/g, '')) * (counts[item.id] || 1);
                                    return accumulator + itemCost;
                                }, 0)} грн.</div>
                                {usersId.length === 0 ?
                                    <form className="contacts__left-block basket-left" onSubmit={handleSubmit}>
                                        <div className="contacts__title">Введите ваши данные для обратной связи с Вами!!!</div>
                                        <div className="contacts__input">
                                            <label>Ваше имя</label>
                                            <input
                                                type="text"
                                                placeholder="Ведите Ваше имя"
                                                value={name}
                                                name="name"
                                                required
                                                onChange={(e) => {setName(e.target.value); setError(false);}}
                                            />
                                        </div>
                                        <div className="contacts__input">
                                            <label>Телефон</label>
                                            <input
                                                type="tel"
                                                placeholder="067..."
                                                value={mail}
                                                name="email"
                                                required
                                                onChange={(e) => {setMail(e.target.value); setError(false);}}
                                            />
                                        </div>
                                        {error ? <div className="error">неправильный телефон</div> : null}
                                        <button type="submit" className="basket__button">Оформить заказ1</button>
                                    </form> :
                                    null}
                                {usersId.length === 0 ? null : <button onClick={handleOrder} className="basket__button">Оформить заказ</button>}

                            </div>
                        ) : (

                            <div className="basket__title basket__title-margin">Ваша корзина пуста</div>
                        )

                    ) :
                    (
                        <div className="basket__confirmation confirmation">
                            <div className="confirmation__title">Ваш заказ принят!!!</div>
                            <div className="confirmation__text">Ожидайте наш звонок для подтверждение</div>
                        </div>
                    )
            }



        </div>
    );
}

export default Basket;