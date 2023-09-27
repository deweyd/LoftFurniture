import './Search.scss';
import {useEffect, useState} from 'react';
import searchIcon from "../../images/search.svg"
import {Link} from "react-router-dom";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import SelectionСard from "../SelectionСard/index.jsx";
import Card from "../Card/Card.jsx";


function Search() {
    const [search, setSearch] = useState('');
    const cards = useFirebaseData('cards');
    const filterCards = cards.filter((card) => {
        const titleMatch = card.title && card.title.toLowerCase().includes(search.toLowerCase());
        const groupMatch = card.text && card.text.toLowerCase().includes(search.toLowerCase());
        return titleMatch || groupMatch;
    });
    const handleClosed = () => {
        setSearch("")
    }
    return (
        <div className={`search-block ${search.length > 0 ? 'active' : ''}`}>
            <div className={"example"}>
                <input
                    type="text"
                    placeholder="Поиск"
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className={`search-button ${search.length > 0 ? 'active' : ''}`} onClick={() => setSearch("")}>+</button>
                <div className="selection__cards">
                    {filterCards.map((item, index) => (
                        <Card item={item} key={index} handleClosed={handleClosed} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Search;