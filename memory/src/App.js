import napis from './img/memory.png'
import brain from './img/brain.png'
import './App.css';
import First from './First'

function App() {
  return (
    <div className="App">
      <div className="Napis">
        <img height='100px' src={napis} alt="Memory"></img>
      </div>
      <div className="Brain">
        <img id='b' height='100px' src={brain} alt="Brain"></img>
      </div>
      <First/>
      <div className="Gra">
        
      </div>
      <div className="Chat">
        
      </div>
    </div>
  );
}

export default App;
