import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full my-8 flex justify-evenly text-xl">
            <Link to="/">Translate</Link>
            <Link to="collection">Collection</Link>
        </nav>
    )
}

export default Navbar