import {Link} from "react-router-dom";
import './Rating.scss'
import {useEffect, useState} from "react";
import logo from '../../images/Logo.svg'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import firebase from 'firebase/compat/app';



function Rating({cardId, collectionName, filterCards}) {
    const [selectedStars, setSelectedStars] = useState([]);
    const [hoveredStars, setHoveredStars] = useState([]);
    const [filter, setFilter] = useState('');
    console.log(filterCards)
    useEffect(() => {
        setFilter('');
    }, [filter]);

    const handleStarHover = (index) => {
        setHoveredStars(Array.from({ length: index + 1 }, (_, i) => i + 1));
    };

    console.log(cardId);

    const averageRating = selectedStars.length > 0
        ? selectedStars.reduce((acc, current) => acc + current, 0) / selectedStars.length
        : 0;

    const handleStarClick = (index) => {
        const newSelectedStars = Array.from({ length: index + 1 }, (_, i) => i + 1);
        console.log(newSelectedStars)
        setSelectedStars(newSelectedStars);

        const currentRating = newSelectedStars.length;

        const newAverageRating = (newSelectedStars.reduce((acc, current) => acc + current, 0)) / currentRating;
        const averageRatingNum = newAverageRating.toFixed(2);
        console.log(averageRatingNum);

        if (cardId !== undefined) {
            const newField = 'rating';
            const cardRef = firebase.database().ref(`${collectionName}/${cardId}`);
            cardRef.update({
                [newField]: averageRatingNum
            })
                .then(() => {
                    console.log('Поле добавлено к карточке.');
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении поля: ', error);
                });
        }
    };

    const stars = [1, 2, 3, 4, 5];


    return (
        <div className="star">
            {stars.map((_, index) => (
                <div
                    key={index}
                    className={`star__item ${selectedStars.includes(index + 1) ? 'star__item_select' : ''}`}
                    onMouseOver={() => handleStarHover(index)}
                    onClick={() => handleStarClick(index)}
                    onMouseOut={() => setHoveredStars([])}
                >
                    <i
                        className={`fa fa-star ${hoveredStars.includes(index + 1) || index < filterCards ? 'star__item_active' : ''}`}
                        aria-hidden="true"
                    > </i>
                </div>
            ))}
            <p>Средний рейтинг: {!filterCards ? (averageRating.toFixed(2)): (filterCards)}</p>
        </div>

    );
}

export default Rating;