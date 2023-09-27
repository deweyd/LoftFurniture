import './Bread.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import { Link, useLocation } from "react-router-dom";

function decodePath(path) {
    try {
        return decodeURIComponent(path);
    } catch (error) {
        // Обработка ошибок декодирования
        console.error("Ошибка декодирования пути:", error);
        return path;
    }
}
function Bread() {
    const location = useLocation();
    const pathnames = decodePath(location.pathname).split("/").filter((x) => x);

    return (
        <div>
            <Link to="/">Главная</Link>
            {pathnames.map((path, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <span key={path}>{decodePath(path)}</span>
                ) : (
                    <Link key={path} to={routeTo}>
                        {decodePath(path)}
                    </Link>
                );
            })}
        </div>
    );
}

export default Bread;