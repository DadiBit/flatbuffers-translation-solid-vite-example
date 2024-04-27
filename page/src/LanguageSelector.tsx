import { For, createResource } from "solid-js";
import { Language, fetchTranslation, setLanguage } from "./Language";

export default function LanguageSelector() {
    
    // here we want to retrieve the raw resource
    const [ languages ] = createResource(() => fetchTranslation('languages'))

    return (
        <select onChange={({ currentTarget: { value } }) => setLanguage(value as Language)}>
            
            <For each={Object.keys(Language) as Language[]} >{ lang =>
                <option value={lang}>{
                    languages()?.[lang]() // try getting the language string
                    ?? lang // fallback to just the lang id
                }</option>
            }</For>
            
        </select>
    )
}