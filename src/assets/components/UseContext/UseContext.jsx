import {Link} from "react-router-dom";
import './Use Context.scss'
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();
function UseContext({ children }) {
    const [count, setCount] = useState([]);
    const updateСount = (newCount) => {
        setCount(newCount);
    };
    return (
        <MyContext.Provider value={{ count, updateСount }}>
            {children}
        </MyContext.Provider>
    );
}

export {UseContext, MyContext};