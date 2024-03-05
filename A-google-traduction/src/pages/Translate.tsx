import { useState, useEffect, useContext } from 'react'
import { Translation, TranslationCollection, UpdateTranslationCollection } from '../App'
import Navbar from '../components/Navbar'

function Translate() {
  const [source, setSource] = useState("Bonjour")
  const [target, setTarget] = useState("Hello")
  const [sourceLang, setSourceLang] = useState("fr")
  const [targetLang, setTargetLang] = useState("en")
  const [availableLang, setAvailableLang] = useState<{ language: string }[]>([])

  const collection: Translation[] = useContext(TranslationCollection);
  const setCollection = useContext(UpdateTranslationCollection);

  useEffect(() => {
    const fetchAvailableLanguages = async () => {
      const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages';
      const options = {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setAvailableLang(result.data.languages)
        console.log(result.data.languages);
        setAvailableLang([{ "language": "fr" }, { "language": "en" }, { "language": "es" }])
      } catch (error) {
        console.error(error);
      }
    }
    fetchAvailableLanguages()
  }, [])

  useEffect(() => {
    const translate = async () => {
      const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
          q: source,
          target: targetLang,
          source: sourceLang
        })
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTarget(result.data.translations[0].translatedText);
      } catch (error) {
        console.error(error);
      }
    }
    translate()
  }, [source, sourceLang, targetLang])

  const addTranslationToCollection = () => {
    alert('Translation added to collection')
    setCollection([...collection, { source, target, sourceLang, targetLang }])
  }

  return (
    <>
      <Navbar />
      <header className='my-4 flex justify-center'>
        <img className='m-4' src="/translate.png" alt="Google Traduction logo" width={50} />
        <h1>Google Traduction</h1>
      </header>
      {/* <p>source : {source} | target : {target} | source : {sourceLang} | target : {targetLang} | </p> */}

      <main>
        <div className='my-8 flex flex-row justify-center'>
          <div className='w-64 h-32 flex flex-col'>
            <select title='Source language' value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
              {availableLang.map(language => <option key={language.language}>{language.language}</option>)}
            </select>
            <input className='h-28 flex text-center' placeholder='Expression to translate' value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <div className='w-64 h-32 flex flex-col'>
            <select title='Target language' value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              {availableLang.map(language => <option key={language.language}>{language.language}</option>)}
            </select>
            <div className='h-28 flex justify-center items-center'>{target}</div>
          </div>
        </div>

        <div>
          <button type='button' onClick={() => addTranslationToCollection()}>Add to collection</button>
        </div>
      </main>
    </>
  )
}

export default Translate
