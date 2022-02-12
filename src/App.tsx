import img from './no-bullyaaaaahhh.png';
import './App.css';
import { useState } from 'react';

const mult = (2**8);

const swapClass = (e: Element, a: string, r: string) => {
  e.classList.remove(r);
  e.classList.add(a);
};


const App = () => {
  const [textInput, setTextInput] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [chosen, setChosen] = useState('- no item chosen -');

  const onClick = () => {
    const img = document.getElementById('img');
    if (img) {
      // stop
      if (img.classList.contains('App-logo-fast')) {
        swapClass(img, 'App-logo-finish', 'App-logo-fast');

        if(items.length > 0) {
          setRandom();
        }

      } else {
        swapClass(img, 'App-logo-fast', 'App-logo-finish');
      }
    }
  };

  const setRandom = () => {
    const a = Math.random() * items.length * mult;
    setChosen(items[Math.floor(a) % items.length]);
  };

  const onClickAdd = () => {
    if(textInput.length > 0) {
      setItems([...items, textInput]);
      setTextInput('');
    }
  };

  return (
    <div className="App">
      <h2>Scuffed Picker</h2>
      <div className='left'>
        <div className="container">
          <img id='img' src={img} alt="wheeeeee" width={400} height={400} />
        </div>
        <p>{chosen}</p>
        <div className='button-container'>
          <div>
            <button className='button-64' onClick={() => onClick()}>
              <span className='text'>SPIN</span>
            </button>
          </div>
        </div>
      </div>
      <div className='right'>
        <h4>Enter your shit here:</h4>
        <div className='block'>
          <input value={textInput} onChange={(e) => setTextInput(e.currentTarget.value)} type='text' />
          <button onClick={onClickAdd}><span>Add</span></button>
        </div>
        <button onClick={() => { setItems([]); setChosen('- no item chosen -'); }}><span>Clear Items</span></button>
        <div className='block'>
          <h4>Your shit:</h4>
          <ul>
            {items.map((item, i) => <li key={`${i}_${item}`}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default App;
