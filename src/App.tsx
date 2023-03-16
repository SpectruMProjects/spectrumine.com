import React from 'react';
import './App.css';
import BigBabyText from './Components/BigBabyText';
import Button from './Components/Button';
import ServerContainter from './Components/ServerContainer';
import Header from './Components/Header';
import Hardcore from "./res/BlocksDisc/hardcore.json";
import Steam from "./res/BlocksDisc/steam.json";
import Aur from './res/BlocksDisc/aur.json'

function App() {
  let func = () => {
  }
  return (
    <div className="App">
      <div className='flexitems bgintro' style={{minHeight: "100dvh"}}>
      <div>
        <BigBabyText size={"3dvw"} margin={"5dvw 10dvw"}>SPECTRUMINE.COM</BigBabyText>
        <BigBabyText size={"4dvw"} margin={"0 10dvw"}>Добро пожаловать на платформу лицензионных игровых серверов Minecraft</BigBabyText>
        <div className='centerbutton'>
        <a href="#servers"><Button onClick={func} width={"30dvh"} height={"7dvh"}>К серверам</Button></a>
        </div>
      </div>
      </div>
      <div id='servers' className='flexitems' style={{minHeight: "100dvh", flexGrow: 4, justifyContent: "flex-start"}}>
        <div><BigBabyText size={"3dvw"} margin={"100px 0"}>Сервера</BigBabyText></div>
        <div className="servers">
          <ServerContainter 
          title={Steam.title}
          discription={Steam.discription}
          additional={Steam.additional}
          background={"wrench.png"}/>
          <ServerContainter
          additional={Hardcore.additional} 
          title={Hardcore.title}
          discription={Hardcore.discription}
          background={"hcheart.png"}/>
          <ServerContainter 
          title={Aur.title}
          discription={Aur.discription}
          additional={Aur.additional}
          background={"wrench.png"}/>
        </div>
      </div>
    </div>
  );
}

export default App;
