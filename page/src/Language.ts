import { ByteBuffer } from 'flatbuffers';
import { createResource, createSignal } from 'solid-js';

import { Translation } from './generated/translation';

export type KeyOfType<Type, ValueType> = keyof {
  [Key in keyof Type as Type[Key] extends ValueType ? Key : never]: any;
};

// Methods that return either string or null
export type Language = KeyOfType<Translation, () => string|null>;

/**
 * Runtime helper to check with, eg, `'eng' in Language` or iterate with `Object.keys(Language)`.
 * Throws error on missing key. Also, duplication not allowed.
 * */
export const Language : {
  [ lang in Language ] : null
} = {
  eng: null,
  ita: null,
  deu: null,
  jap: null
};

// The default language used
const DEFAULT_LANGUAGE: Language = 'eng';

// The language Signal, when this changes all translations are changed accordingly
export const [language, setLanguage] = createSignal(DEFAULT_LANGUAGE as Language);

// Internal Translation cache map
const translationsCache: Map<string, Translation> = new Map();

export const fetchTranslation = async (key: string, update = false) => {
  
  // slow shit down before doing anything - simulate slow pc
  //await new Promise(resolve => setTimeout(resolve, 1000));

  // try to get from cache (unless forced to update)
  if (translationsCache.has(key) && !update)
    return translationsCache.get(key)!;

  // slow shit down before fetching - simulate slow internet
  //await new Promise(resolve => setTimeout(resolve, 1000));

  // fetch the binary flatbuffer data
  const res = await fetch(`/translations/${key}.bin`);

  // response --> Uint8Array --> ByteBuffer --> Translation
  const uint8Array = new Uint8Array(await res.arrayBuffer());
  const byteBuffer = new ByteBuffer(uint8Array);
  const translation = Translation.getRootAsTranslation(byteBuffer);
  
  // cache translation
  translationsCache.set(key, translation);

  // return it
  return translation;
  
}

/**
 * Create a TranslationResource given the translation key (eg 'hello_world')
 */
export const createTranslation = (key: string, fallback = DEFAULT_LANGUAGE) => {
    return createResource(language, async lang => {
        const translation = await fetchTranslation(key);
        return translation[lang]()
          // fallback if value is null-ish
          ?? translation[fallback]();
    });
}
