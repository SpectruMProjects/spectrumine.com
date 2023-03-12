import React from 'react';
import './App.css';
import BigBabyText from './Components/BigBabyText';
import Button from './Components/Button';
import Containter from './Components/Container';
import Header from './Components/Header';

function App() {
  let func = () => {
  }
  return (
    <div className="App">
      <Header></Header>
      <div className='flexitems bgintro' style={{minHeight: "100dvh"}}>
      <div>
        <BigBabyText size={"4dvw"} margin={"0 10dvw"}>Добро пожаловать на платформу лицензионных игровых серверов Minecraft</BigBabyText>
        <div className='centerbutton'>
        <Button onClick={func} width={"20dvw"} height={"10dvh"}>Перейти по ссылке</Button>
        </div>
      </div>
      </div>
      <div className='flexitems' style={{height: "100dvh", flexGrow: 4}}>

      </div>
    </div>
  );
}

export default App;
