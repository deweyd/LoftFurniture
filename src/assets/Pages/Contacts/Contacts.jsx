import './Contacts.scss'
import FormContacts from "../../components/FormContacts/index.jsx";
import Map from "../../components/Map/Map.jsx";


function Contacts() {


    return (
        <div className={"content contacts"}>
           <FormContacts/>
            <Map/>
        </div>
    );
}

export default Contacts;