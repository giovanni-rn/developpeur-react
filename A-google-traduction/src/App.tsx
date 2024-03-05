import { createContext, useState } from 'react'
import Translate from './pages/Translate.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collection from './pages/Collection.js';
import { mockTranslationCollection } from './mock.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Translate />,
    },
    {
        path: "collection",
        element: <Collection />,
    },
    {
        path: "*",
        element: <Translate />,
    },
]);

export interface Translation { source: string, target: string, sourceLang: string, targetLang: string }

export const TranslationCollection = createContext<Translation[]>([])
export const UpdateTranslationCollection = createContext((updatedCollection: Translation[]) => { })

function App() {
    const [collection, setCollection] = useState<Translation[]>(mockTranslationCollection)

    return (
        <TranslationCollection.Provider value={collection}>
            <UpdateTranslationCollection.Provider value={setCollection}>
                <RouterProvider router={router} />
            </UpdateTranslationCollection.Provider>
        </TranslationCollection.Provider>
    )
}

export default App