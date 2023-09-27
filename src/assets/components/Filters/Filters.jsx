import './Filters.scss'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";




function Filters({ sortType, handleChange }) {
    return (
        <form className="filter">
            <label htmlFor="sort">Сортировка по </label>
            <select
                className={"filter__select"}
                value={sortType}
                onChange={handleChange}
                id="sort">
                <option value="descending">по убыванию цены</option>
                <option value="ascending">по возрастанию цены</option>
                <option value="popularity">по популярности</option>
            </select>
        </form>
    );
}

export default Filters;