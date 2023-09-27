import './CardsPage.scss'
import SelectionСard from "../../components/SelectionСard/index.jsx";
import CardPage from "../../components/CardPage/index.jsx";
import { useParams } from 'react-router-dom';

function CardsPage() {
    return (
        <div className={"content"}>
            <CardPage/>
            <SelectionСard pagination={false} slice={true} showFilter={false}/>
        </div>
    );
}

export default CardsPage;