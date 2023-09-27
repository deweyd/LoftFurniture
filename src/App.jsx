import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./assets/Pages/Home/Home.jsx";
import Header from "./assets/components/Header/index.jsx";
import Footer from "./assets/components/Footer/index.jsx";

import Cards from "./assets/Pages/Cards/index.js";
import CardsPage from "./assets/Pages/CardsPage/index.js";
import About from "./assets/Pages/About/index.js";
import Contacts from "./assets/Pages/Contacts/index.js";
import Delivery from "./assets/Pages/Delivery/index.js";
import Payment from "./assets/Pages/Payment/index.js";
import Basket from "./assets/Pages/Basket/index.js";
import Cabinet from "./assets/Pages/Cabinet/index.js";
import AdminPanel from "./assets/Pages/AdminPanel/index.js";
import {useState} from "react";
import {UseContext} from "./assets/components/UseContext/index.jsx";




function App( ) {

  return (
      <UseContext>
        <div className='App'>
            <Header/>
            <div className="container-wrap">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                </Routes>
                <Routes>
                    <Route path="/Cabinet/:userId" element={<Cabinet />} />
                </Routes>
                <Routes>
                    <Route exact path="/AdminPanel" element={<AdminPanel/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Cards/:itemId" element={<Cards/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/CardsPage/:itemId" element={<CardsPage/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Basket" element={<Basket/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Cabinet" element={<Cabinet/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Delivery" element={<Delivery/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Contacts" element={<Contacts/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/Payment" element={<Payment/>}/>
                </Routes>
            </div>
                <Routes>
                    <Route exact path="/About" element={<About/>}/>
                </Routes>
            <Footer/>

        </div>
      </UseContext>
  )
}

export default App
