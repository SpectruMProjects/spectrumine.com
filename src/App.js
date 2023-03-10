import './App.css';
import Project from './Project';

function App() {
  return (
    <div className="App">
      <div className="header">
      <h1 className="headerText" style={{fontSize: "20px", alignSelf: "center"}}>Проект Minecraft серверов</h1><h1 className="headerText">SpectruMine.com</h1> 
      </div>
      <div className='linearGrad'/>
      <div className="projects">
      <h1 className="hserv">Minecraft сервера</h1>
        <div className="projectsIn">
        <Project title={"title"}></Project>
        <Project title={"title"}></Project>
        </div>
      </div>
      <div className='linearGradRev'/>
    </div>
  );
}

export default App;
