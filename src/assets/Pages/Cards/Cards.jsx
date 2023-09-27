import './Cards.scss'
import SelectionСard from "../../components/SelectionСard/index.jsx";
import Bread from "../../components/Bread/index.jsx";


function Cards() {


    return (
        <div className={"content cards"}>
            {/*<aside className={"content__aside"}>*/}

            {/*</aside>*/}
            <main className={"content__main cards__main"}>
                <SelectionСard pagination={true} slice={false} showFilter={true}/>
            </main>
        </div>
    );
}

export default Cards;