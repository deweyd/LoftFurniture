import {Link} from "react-router-dom";
import './Tabs.scss'
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import useFirebaseData from "../../hooks/useFirebaseData.js";
import Rating from "../Rating/index.jsx";



function Tabs({filterCards}) {
    console.log(filterCards[0])
    const collectionName = 'cards'
    const cards = useFirebaseData(collectionName);
    const [mail, setMail] = useState('');
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    console.log(mail)
    const authorization = useFirebaseData("authorization");
    const usersId = useFirebaseData('usersId');
    const [lasId, setLasId] = useState('');
    console.log(typeof lasId)
    const [autho, setAutho] = useState(authorization);
    console.log(lasId)
    useEffect(() => {
        if (usersId) {
            const newFount = authorization.filter((item) => item.id === lasId);
            if (newFount.length > 0) {
                setAutho(newFount[0]);
            }
        }
    }, [lasId, authorization]);
    console.log(autho)
    useEffect(() => {
        if (autho.name !== undefined || autho.mail !== undefined) {
            setName(autho.name);
            setMail(autho.email);
        }
    }, [autho.name, autho.mail]);
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id; // Возвращаем значение поля 'id' из объекта
        });
        const resultString = mappedArray.join(', ')
        console.log(resultString)
        setLasId(resultString);
    }, [usersId]);
    const delivery = useFirebaseData('delivery');
    const payment = useFirebaseData('payment');
    const [cardId, setCardId] = useState('');
    useEffect(() => {
        setCardId(filterCards[0].id);
    }, [cardId]);

    console.log(cardId)
    const [review, setReview] = useState('');
    useEffect(() => {
        if (filterCards[0].review){
            setReview(filterCards[0].review);
        }
        else{
            setReview('')
        }

    }, [filterCards]);
    console.log(review)
    // setCardId("" + filterCards[0].id);
    const [activeTab, setActiveTab] = useState(1);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    const [activeValue, setActiveValue] = useState('');
    const handleChange = (e) => {
        setActiveValue(e)
    }
    const handleReview = (e) => {
        e.preventDefault()
        const currentDate = new Date().toLocaleDateString();
        const reviewData = {
            review: activeValue,
            name: name,
            mail: mail,
            date: currentDate
        };
        const reviewFolderRef = firebase.database().ref(`${collectionName}/${cardId}/review`);
        reviewFolderRef.once('value')
            .then((snapshot) => {
                const reviewCount = snapshot.numChildren();
                const newReviewNumber = reviewCount + 1;
                const newReviewRef = reviewFolderRef.child(newReviewNumber);
                newReviewRef.set(reviewData)
                    .then(() => {
                        setActiveValue('');
                        setName('')
                        setMail('')
                        console.log('Отзыв добавлен в папку "review" с номером', newReviewNumber);
                    })
                    .catch((error) => {
                        console.error('Ошибка при добавлении отзыва: ', error);
                    });
            })
            .catch((error) => {
                console.error('Ошибка при получении данных из папки "review": ', error);
            });
    };

    const [numberBlocks, setNumberBlocks] = useState(3);
    const loadMoreBlocks = () => {
        setNumberBlocks(prevBlocks => prevBlocks + 3);
    };
    return (
        <div className="tabs">
                <input
                    type="radio"
                    name="tab"
                    id="tab1"
                    checked={activeTab === 1}
                    onChange={() => handleTabClick(1)}
                />
                <label htmlFor="tab1">Характеристики</label>
                <input
                type="radio"
                name="tab"
                id="tab2"
                checked={activeTab === 2}
                onChange={() => handleTabClick(2)}
                />
                <label htmlFor="tab2">Отзывы</label>

                <input
                type="radio"
                name="tab"
                id="tab3"
                checked={activeTab === 3}
                onChange={() => handleTabClick(3)}
                />
                <label htmlFor="tab3">Доставка и оплата</label>

            <div className="tab-content">
                {filterCards.map((item, index) => (
                    <div key={index} className="tab-content__items" id="content1" style={{ display: activeTab === 1 ? 'flex' : 'none' }}>
                        {/*{item.sizes.map((size, sizeIndex) => (*/}
                        {/*    <div key={sizeIndex} className="tab-content__item">*/}
                        {/*        <span className="tab-content__title">Размер.........................</span>*/}
                        {/*        <span className="tab-content__info">{size}</span>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        <div className="describe-">{item.describe}</div>
                    </div>
                ))}
                <div className="tab-content__items review" id="content2" style={{ display: activeTab === 2 ? 'flex' : 'none' }}>
                    <div className="review__block">
                        <div className="review__title">Отзыв по даному товару</div>
                        {Object.values(review).slice(0, numberBlocks).map((inner, innerIndex) => (
                            <div key={innerIndex} className="review__box">
                                <div className="review__name">
                                    <div>{inner.name}</div>
                                    <div>{inner.date}</div>
                                </div>
                                <div className="review__item">{inner.review}</div>

                            </div>
                        ))}
                        {numberBlocks < review.length && (
                            <button className="contacts__button" id="loadMore" onClick={loadMoreBlocks}>
                                Загрузить отзывы
                            </button>
                        )}
                    </div>
                    <Rating cardId={cardId}collectionName={collectionName}/>
                    <div className="review__title">Оставьте свой отзыв на данный товар</div>
                    <form action="" onSubmit={handleReview}>
                        <textarea
                            onChange={(e) => handleChange(e.target.value)}
                            className="review__text"
                            required
                            value={activeValue}
                            name="" id="" cols="30" rows="10">
                        </textarea>
                        {!parseInt(lasId) > 0 ?
                            <input
                                placeholder="Имя"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            /> :
                            <input placeholder={`   ${autho.name}`} name={name} value={name} type="text" disabled/> }
                        {!parseInt(lasId) > 0 ?
                            <input
                                name="email"
                                required
                                onChange={(e) => {setMail(e.target.value)}}
                                placeholder="Ваш email"
                                value={mail}
                                type="email"
                            /> :
                            <input placeholder={`   ${autho.email}`} type="text" disabled/>}
                        {!parseInt(lasId) > 0 ?
                            <button type="submit" className="page__button">Оставить отзыв</button> :
                            <button type="submit" className="page__button">Оставить отзыв</button>}
                    </form>
                </div>

                <div className="tab-content__items pay" id="content3" style={{ display: activeTab === 3 ? 'flex' : 'none' }}>
                    <div className="payment__info">
                        {
                            payment.map((item, index) => (
                                <div key={index}>
                                    <div className="payment__info-title">{item.titleMain}</div>
                                    <p>{item.text}</p>
                                    <p>{item.text1}</p>
                                    <p>{item.text2}</p>
                                    <p>{item.text3}</p>
                                    <p>{item.text4}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="delivery__text">
                        {
                            delivery.map((item, index) => (
                                <div key={index}>
                                    <div className="delivery__text-title">{item.titleMain}</div>
                                    <p>{item.text}</p>
                                    <div className="delivery__text-title">{item.titleElse}</div>
                                    <p>{item.textElse}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Tabs;