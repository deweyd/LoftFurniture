import './Home.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import Slider_main from "../../components/Slider_main/index.jsx";
import SelectionСard from "../../components/SelectionСard";

function Home() {
    const cards = useFirebaseData('cards')
    console.log(cards)

    return (
        <div className={"content"}>
            <Slider_main/>
            <SelectionСard pagination={false} slice={false} showFilter={false}/>
        </div>
    );
}

export default Home;