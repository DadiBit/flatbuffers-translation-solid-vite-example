import solidLogo from '/solid.svg'
import viteLogo from '/vite.svg'
import typescriptLogo from '/typescript.svg'
import flatbuffersLogo from '/flatbuffers.png'
import './App.css'

import { createTranslation } from './Language';
import LanguageSelector from './LanguageSelector';

function App() {

  const [hello_world] = createTranslation('hello_world');
  const [test] = createTranslation('test');

  return (
    <>
      
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={typescriptLogo} class="logo typescript" alt="TypeScript logo" />
        </a>
        <a href="https://flatbuffers.dev/" target="_blank">
          <img src={flatbuffersLogo} class="logo flatbuffers" alt="FlatBuffers logo" />
        </a>
      </div>
      
      <h1>Vite + Solid + TS + FlatBuffers</h1>

      <div class="card">
        <code>hello_world: "{hello_world()}", test: "{test()}"</code>
      </div>

      <div class="card">
        <LanguageSelector />
      </div>
      
      <p class="read-the-docs">
        Click on the logos to learn more
      </p>

    </>
  )
}

export default App
