import { useContext } from "react";
import Navbar from "../components/Navbar"
import { Translation, TranslationCollection, UpdateTranslationCollection } from "../App";

function Collection() {
    const collection: Translation[] = useContext(TranslationCollection);

    return (
        <>
            <Navbar />
            <main>
                <h1 className="my-8">Collection</h1>
                <ul>
                    {collection.map((translation, index) => <li key={index}>{translation.source} : {translation.target}</li>)}
                </ul>
            </main>
        </>
    )
}

export default Collection