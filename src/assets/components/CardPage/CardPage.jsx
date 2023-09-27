import {Link, useParams} from "react-router-dom";
import './CardPage.scss'
import Slider_page from "../Slider_page/index.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import Rating from "../Rating/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import {useEffect, useState} from "react";
import firebase from "firebase/compat/app";



function CardPage() {
    const { itemId } = useParams();
    console.log(itemId)
    const usersId = useFirebaseData('usersId');
    const collectionName = 'authorization';
    const [cardBascket, setCardBascket] = useState([]);
    const [lasId, setLasId] = useState('');
    const [buy, setBuy] = useState(true);
    const cards = useFirebaseData('cards');
    const [itemID, setItemID] = useState(parseInt(itemId));
    const [filterCard, setFilterCard] = useState([]);
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id; // Возвращаем значение поля 'id' из объекта
        });
        const resultString = mappedArray.join(', ')
        console.log(resultString)
        setLasId(resultString);
    }, [usersId]);
    // const filterCards = cards.filter(card => card.id === itemID).map(card => ({ ...card }));
    // const [filter, setFilter] = useState();
    // useEffect(() => {
    //     setFilter(filterCards[0].rating);
    // }, [filter]);
    // console.log(filter)
    useEffect(() => {
        const newItemId = parseInt(itemId);
        setItemID(newItemId); // Обновляем itemID
    }, [itemId]);

    useEffect(() => {
        const filteredCards = cards.filter(card => card.id === itemID).map(card => ({ ...card }));
        setFilterCard(filteredCards);
    }, [itemID, cards]);


    console.log(filterCard)
    const handleBasket = (item) => {
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
                setCardBascket((prevCardBasket) => {
                    const newCardBasket = [...prevCardBasket, stateObject];
                    console.log(newCardBasket);
                    return newCardBasket;
                });
            })
            .catch((error) => {
                console.error('Ошибка при добавлении карточки в Firebase: ', error);
            });



        //     const block = document.querySelector('.block');
        //     const clone = block.cloneNode(true);
        //
        //     clone.style.position = 'fixed';
        //     clone.style.zIndex = '100';
        //
        //     const img = document.querySelector('.img');
        //     const imgPosition = img.getBoundingClientRect();
        //
        //     document.querySelector('.image_block').appendChild(clone);
        //
        //     const animation = clone.animate(
        //         [
        //             { top: `${imgPosition.top}px`, right: `${imgPosition.right}px`, opacity: 0, width: '40px' },
        //             { top: '0px', right: '25%', opacity: 1, width: '100px' },
        //
        //         ],
        //         { duration: 1500 }
        //     );
        //
        //     animation.onfinish = () => {
        //         clone.remove();
        //         setShowBlock2(true);
        //
        //         setTimeout(() => {
        //             setShowBlock2(false);
        //         }, 2000);
        //     };
    };
    return (
        <div className={"content__page page"}>
            {filterCard.map(card => (
                <div key={card.id}>
                    <div className="page__describe">
                        <div className="page__slider">
                            <img src={card.img} alt=""/>
                        </div>
                        <div className="page__about">
                            <Rating filterCards={card.rating}/>
                            <div className="page__title">{card.title}</div>
                            <div className="page__subtitle">{card.group}</div>
                            <div className="page__pay">
                                <div className="page__price">{card.price} грн.</div>
                                <button onClick={() => {handleBasket(card); setBuy(false)}} className="page__button">{buy ? 'Купить': 'В корзине'}</button>
                            </div>
                            <div className="page__choose">
                                <form className="filter__number">
                                    <label htmlFor="sort">Количество: </label>
                                    <span>1</span>
                                    {/*<select*/}
                                    {/*    className={"filter__select-num"}*/}
                                    {/*    value=""*/}
                                    {/*    onChange=""*/}
                                    {/*    id="sort">*/}
                                    {/*    <option value="1">1</option>*/}
                                    {/*    <option value="2">2</option>*/}
                                    {/*    <option value="3">3</option>*/}
                                    {/*    <option value="4">4</option>*/}
                                    {/*    <option value="5">5</option>*/}
                                    {/*</select>*/}
                                </form>
                                {/*<form className="filter__size">*/}
                                {/*    <label htmlFor="sort">Размер </label>*/}
                                {/*    <select*/}
                                {/*        className={"filter__select-ішяу"}*/}
                                {/*        value=""*/}
                                {/*        onChange=""*/}
                                {/*        id="sort">*/}
                                {/*        {card.sizes.map((item, index) =>(*/}
                                {/*            <option key={index} value={index}>{item}</option>*/}
                                {/*        ))}*/}
                                {/*    </select>*/}
                                {/*</form>*/}
                            </div>
                            <div className="page__describes"><span>Описание</span>{card.describe}</div>
                        </div>
                    </div>
                    <div className="page__characteristic">
                        {/*{card.sizes.map((item, index) =>(*/}
                        {/*    <Tabs key={index} item={item} index={index}/>*/}
                        {/*))}*/}
                        <Tabs filterCards={filterCard}/>
                    </div>
                </div>
            ))}






        </div>
    );
}

export default CardPage;