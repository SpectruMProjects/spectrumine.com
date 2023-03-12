import React from 'react';
import './App.css';
import BigBabyText from './Components/BigBabyText';
import Containter from './Components/Container';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
        <BigBabyText size={"100px"}>Добро пожаловать на платформу лицензионных игровых серверов Minecraft</BigBabyText>
    </div>
  );
}

export default App;
