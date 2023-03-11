import React from 'react';
import './App.css';
import BigBabyText from './Components/BigBabyText';
import Containter from './Components/Container';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Containter height={"1000px"} width={"1000px"}>
        <BigBabyText size={"100px"}>Hello</BigBabyText>
        </Containter>
    </div>
  );
}

export default App;
