import img from './rounded.png';
import './App.css';
import { FC, useState } from 'react';

const mult = (2**8);

const swapClass = (e: Element, a: string, r: string) => {
  e.classList.remove(r);
  e.classList.add(a);
};


const App = () => {
  const [textInput, setTextInput] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [chosen, setChosen] = useState('- no item chosen -');

  const mobileWidth = 900;
  let imgWidth = 400;

  const screen = { w: window.innerWidth, h: window.innerHeight };
  
  if(screen.w < mobileWidth)
    imgWidth = 200;

  const onClick = () => {
    setChosen('- no item chosen -');
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
    setChosen(`Your Pick -> ${items[Math.floor(a) % items.length]}`);
  };

  const onClickAdd = () => {
    if(textInput.length > 0) {
      setItems([...items, textInput]);
      setTextInput('');
      const input = document.getElementById('text-input');
      if(input) {
        input.focus();
      }
    }
  };

  const onClickClear = () => {
    setItems([]);
    setChosen('- no item chosen -');
  };

  // mobile
  if(screen.w < mobileWidth) {
    return <Mobile
      chosen={chosen}
      imgWidth={imgWidth}
      onClick={onClick}
      onClickAdd={onClickAdd}
      onClickClear={onClickClear}
      items={items}
      textInput={textInput}
      setTextInput={setTextInput}
    />;
  }

  // desktop
  return <Desktop
    chosen={chosen}
    imgWidth={imgWidth}
    onClick={onClick}
    onClickAdd={onClickAdd}
    onClickClear={onClickClear}
    items={items}
    textInput={textInput}
    setTextInput={setTextInput}
  />;
};


interface Props {
  chosen: string;
  imgWidth: number;
  onClick: () => void;
  onClickAdd: () => void;
  onClickClear: () => void;
  items: string[];
  textInput: string;
  setTextInput: (_: string) => void;
}

const Mobile: FC<Props> = (props) => {
  const { imgWidth, chosen, onClick, onClickAdd, onClickClear, items, textInput, setTextInput } = props;

  return (
    <div className="App">
      <h2>Scuffed Picker</h2>
      <div className='block'>
        <div className='block'>
          <img className='image' id='img' src={img} alt="wheeeeee" width={imgWidth} height={imgWidth} />
        </div>
        <div>
          <p className='bold'>{chosen}</p>
        </div>
        <div className='center'>
          <div>
            <button className='button-64' onClick={() => onClick()}>
              <span className='text'>SPIN</span>
            </button>
          </div>
        </div>
      </div>
      <div className='block'>
        <div>
          <h4>Enter your options here:</h4>
        </div>
        <div className=''>
          <input className='text-input' id='text-input' placeholder='Enter Options...' value={textInput} onChange={(e) => setTextInput(e.currentTarget.value)} type='text' />
          <div className='inline-button'>
            <button className='button-63' onClick={onClickAdd}>Add</button>
          </div>
          <div className='block'>
            <button className='button-63' onClick={onClickClear}><span>Clear Items</span></button>
          </div>
        </div>
        <div className='block'>
          <div className='list-items'>
            <h4>Options:</h4>
            <ul>
              {items.map((item, i) => <li key={`${i}_${item}`}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Desktop: FC<Props> = (props) => {
  const { imgWidth, chosen, onClick, onClickAdd, onClickClear, items, textInput, setTextInput } = props;

  return (
    <div className="App">
      <h2>Scuffed Picker</h2>
      <div className='left'>
        <div className="container">
          <img id='img' src={img} alt="wheeeeee" width={imgWidth} height={imgWidth} />
        </div>
        <p className='bold'>{chosen}</p>
        <div className='button-container'>
          <div>
            <button className='button-64' onClick={() => onClick()}>
              <span className='text'>SPIN</span>
            </button>
          </div>
        </div>
      </div>
      <div className='right'>
        <h4>Enter your options here:</h4>
        <div className='input-container'>
          <input className='text-input' id='text-input' placeholder='Enter Options...' value={textInput} onChange={(e) => setTextInput(e.currentTarget.value)} type='text' />
          <div className='inline-button'>
            <button className='button-63' onClick={onClickAdd}>Add</button>
          </div>
          <div className='block'>
            <button className='button-63' onClick={onClickClear}><span>Clear Items</span></button>
          </div>
        </div>
        <div className='center text-back' style={{ marginTop: 10 }}>
          <div>
            <h4>Options:</h4>
            <ul>
              {items.map((item, i) => <li key={`${i}_${item}`}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
