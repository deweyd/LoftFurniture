import {Link} from "react-router-dom";
import './Card.scss'
import {useEffect, useState, useRef} from "react";
import firebase from 'firebase/compat/app';
import {useDispatch, useSelector} from "react-redux";
import {DATA_ID} from "../../store/actions.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";



function Card({item, handleClosed}) {
    const blockRef = useRef(null);
    const [cardBascket, setCardBascket] = useState([]);
    const usersId = useFirebaseData('usersId');
    const collectionName = 'authorization';
    const [animate, setAnimate] = useState(false);
    const [lasId, setLasId] = useState('');
    const [showBlock2, setShowBlock2] = useState(true);
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id; // Возвращаем значение поля 'id' из объекта
        });
        const resultString = mappedArray.join(', ')
        console.log(resultString)
        setLasId(resultString);
    }, [usersId]);
    const newItemNumber = Date.now();
    const date = new Date(newItemNumber);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы в объекте Date начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();
    const animateButton = () => {

    };
    const newFileName = `item${item.id}`;
    const handleBasket = (item) => {
        setShowBlock2(false)
        const database = firebase.database();
        const newFolderName = `${item.id}`;
        const stateObject = {
            "id": item.id,
            "img": item.img,
            "title": item.title,
            "text": item.text,
            "group": item.group,
            "price": item.price,
            "describe": item.describe,
        };
        const basketRef = database.ref(usersId.length === 0 ? 'basket': `${collectionName}/${lasId}/basket`);
        const newFolderRef = basketRef.child(newFolderName);
        newFolderRef.set(stateObject)
            .then(() => {
                console.log('Карточка успешно добавлена в Firebase.');
                // setCardBascket((prevCardBasket) => {
                //     const newCardBasket = [...prevCardBasket, stateObject];
                //     console.log(newCardBasket);
                //     return newCardBasket;
                // });
                // Добавляем обработчик события beforeunload
                if (usersId.length === 0){
                    window.addEventListener('unload', function(event) {
                        basketRef.remove();
                    });
                }
            })
            .catch((error) => {
                console.error('Ошибка при добавлении карточки в Firebase: ', error);
            });

        // const block = document.querySelector('.block');
        // const clone = block.cloneNode(true);
        // console.log(clone)
        //
        // clone.style.position = 'fixed';
        // clone.style.zIndex = '100';
        //
        // const img = document.querySelector('.img');
        //
        // const imgPosition = img.getBoundingClientRect();
        // console.log(imgPosition)
        // document.querySelector('.image_block').appendChild(clone);
        //
        // const animation = clone.animate(
        //     [
        //         { top: `${imgPosition.top}px`, right: `${imgPosition.right}px`, opacity: 0, width: '40px' },
        //         { top: '0px', right: '25%', opacity: 1, width: '100px' },
        //
        //     ],
        //     { duration: 1500 }
        // );
        //
        // animation.onfinish = () => {
        //     clone.remove();
        //     setShowBlock2(true);
        //
        //     setTimeout(() => {
        //         setShowBlock2(false);
        //     }, 2000);
        // };
     };


        // const handleBasket = (item) => {
    //     const existingBasket = JSON.parse(localStorage.getItem('basket')) || [];
    //     const existingCardIndex = existingBasket.findIndex((card) => card.id === item.id);
    //     if (existingCardIndex !== -1) {
    //         existingBasket[existingCardIndex].count += 1;
    //     } else {
    //         const newCard = {
    //             "id": item.id,
    //             "img": item.img,
    //             "title": item.title,
    //             "text": item.text,
    //             "group": item.group,
    //             "price": item.price,
    //             "describe": item.describe,
    //             "count": 1,
    //         };
    //         existingBasket.push(newCard);
    //     }
    //     localStorage.setItem('basket', JSON.stringify(existingBasket));
    // };
    // console.log(localStorage.getItem('basket'));
    return (
        <div className={"content__card card hover-img "}>
            <Link onClick={handleClosed} className="card__img image_block" to={`/CardsPage/${item.id}`} >
                <img width="100" className="img block" src={item.img} />
            </Link>
            {/*<img src={item.img} alt="" className="img" />*/}
            <div className="card__about">
                <Link onClick={handleClosed} className="card__name" to={`/CardsPage/${item.id}`}>{item.title}</Link>
                <span className="card__text">{item.text}</span>
                <span className="card__price">{item.price}</span>
            </div>
            {showBlock2 ? <button onClick={() => handleBasket(item)} className="card__button">Добавить в корзину</button> : <button onClick={() => handleBasket(item)} className="card__button">Товар добавлен в корзину</button>}
        </div>
    );
}

export default Card;
