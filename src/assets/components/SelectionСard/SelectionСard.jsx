import Card from '../Card/index.jsx';
import './SelectionСard.scss'
import {useState} from "react";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import Filters from "../Filters/index.jsx";
import {useParams, useLocation} from "react-router-dom";

function SelectionСard({ showFilter, slice, pagination }) {
    const { itemId } = useParams();
    console.log(itemId)
    const cards = useFirebaseData('cards');
    console.log(cards)
    const [sortType, setSortType] = useState('descending');
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (event) => {
        setSortType(event.target.value);
    };

    const filterCards = cards.filter(card => card.group === itemId).map(card => ({ ...card }));
    const sortCards = filterCards.slice().sort((a, b) => {
        switch (sortType) {
            case 'ascending':
                console.log('Сортировка по возрастанию');
                return parseFloat(a.price) - parseFloat(b.price);
            case 'popularity':
                console.log('Сортировка по популярности');
                return parseFloat(a.popularity) - parseFloat(b.popularity);
            default:
                console.log('Сортировка по убыванию цены (по умолчанию)');
                return parseFloat(b.price) - parseFloat(a.price);
        }
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cardsToDisplay = sortCards.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortCards.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    return (
        <div className={"content__selection selection"}>
            {/*<div className="selection__title">Хиты продаж</div>*/}
            <div className="selection__title">{
                itemId === "Кухни" ||
                itemId === "Спальни" ||
                itemId === "Гостинные" ||
                itemId === "Прихожие" ||
                itemId === "Офисная мебель" ||
                itemId === "Детская" ? itemId : "Хиты продаж"}</div>
            {showFilter && (
                <div>
                    <Filters sortType={sortType} handleChange={handleChange} />
                    <div className="selection__cards">
                        {cardsToDisplay.map((item, index) => (
                            <Card item={item} key={index} />
                        ))}
                    </div>
                </div>

            )}
            {
                slice &&
                <div className="selection__cards">
                    {cards.slice(0,8).map((item, index) => (
                        <Card item={item} key={index} />
                    ))}
                </div>
            }
            {  !showFilter && !slice &&
                <div className="selection__cards">
                    {cards.slice(0,20).map((item, index) => (
                        <Card item={item} key={index}/>
                    ))}
                </div>
            }
            { pagination &&
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}


export default SelectionСard;