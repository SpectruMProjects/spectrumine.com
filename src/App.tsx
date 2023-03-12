import React from 'react';
import './App.css';
import BigBabyText from './Components/BigBabyText';
import Containter from './Components/Container';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='flexitems bgintro' style={{minHeight: "100dvh"}}>
      <div>
        <BigBabyText size={"5dvw"} margin={"0 10dvw"}>Добро пожаловать на платформу лицензионных игровых серверов Minecraft</BigBabyText>
      </div>
      </div>
      <div className='flexitems' style={{height: "100dvh", flexGrow: 4}}>

      </div>
    </div>
  );
}

export default App;
