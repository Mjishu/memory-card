
import './App.css'
import React from 'react'
import Board from './components/Board.jsx'
import { nanoid } from 'nanoid'

function App() {
  const [panels, setPanels] = React.useState(populatePanels)
  const [status,setStatus] = React.useState({
    loading: true,
    score:0,
    gameOver:false,
    allSeen: false,
    highScore: localStorage.getItem("highScore") || 0
  })

  function createPanels(){
    return{
      value: "" ,//* This should be whats in React.useEffect how to store api value here...
      isSeen:false,
      isClicked:false,
      id:nanoid(),
      pokeVal: Math.ceil(Math.random()* 1000),
      name: ''
    }
  }

  function populatePanels(){ //? This should be called in React.useState 
    const newPanel = [];
    for (let i =0;i<10;i++){
      newPanel.push(createPanels())
    }
    return newPanel
  }


  React.useEffect(() => { //? Could I call populatePandels, and then in this for loop append the url to each of the value indexes that correlate with the index in panels?
    async function fetchData() { //I think I should turn boardBody into an arr of objects 
      try{
        const updatedPanels = await Promise.all(panels.map(async(panel) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${panel.pokeVal}`)
          const data = await response.json();
          return {...panel, value:data.sprites.front_default, name:data.name}
        }))
        setPanels(updatedPanels);
        setStatus(prevStatus => ({...prevStatus, loading:false}))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    fetchData();
  }, []);


  React.useEffect(()=>{
    if(status.loading) return;

    const allSeen = panels.every(panel => panel.isSeen)
    if (allSeen){
      setStatus(prevStatus => ({...prevStatus, allSeen:true}))
      console.log("all seen!")
    }
    
    console.log("gameover:" , status.gameOver)
  },[panels])

  function handleClick(id) {
    setPanels(oldPanels => {
      // Find the clicked item
      const clickedItem = oldPanels.find(item => item.id === id);
      const wasSeenBefore = clickedItem.isSeen;
  
      const updatedPanels = oldPanels.map(panel =>
        panel.id === id
          ? { ...panel, isSeen: true, isClicked: wasSeenBefore ? true : panel.isClicked }
          : panel
      );
  
      console.log(clickedItem.isSeen);
      return updatedPanels;
    });
  
    setPanels(prevPanels => {
      const gameOverCondition = prevPanels.some(panel => panel.isSeen && panel.isClicked);
  
      if (gameOverCondition) {
        setStatus(prevStatus => ({ ...prevStatus, gameOver: true }));
      }
  
      setStatus(prevStatus => ({ ...prevStatus, score: prevStatus.score + 1 }));
      return prevPanels; 
    });
  
    // Shuffle the panels
    Shufflepanels();
  }

  React.useEffect(()=>{
    const currentHighScore = localStorage.getItem("highScore") || 0
    if(currentHighScore < Math.ceil(status.score/2)){
      localStorage.setItem("highScore", Math.ceil(status.score/2))
    }
  },[status.allSeen])

  React.useEffect(()=>{
    const currentHighScore = localStorage.getItem("highScore") || 0
    if(currentHighScore < Math.ceil((status.score/2)) -1){
      localStorage.setItem("highScore", Math.ceil(status.score/2))
    }
  },[status.gameOver])
  
  if(status.loading){
    <div>Loading...</div>
  }

  function  Shufflepanels(){
    for(let i= panels.length -1; i>0;i--){
      let random = Math.floor(Math.random()* (i+1));
      let temp = panels[i]
      panels[i] = panels[random]
      panels[random] = temp
    }
    return panels
  }

 const boardElements = panels.map((panel) => <Board name={panel.name} value={panel.value} key={panel.id} handleClick={handleClick} id={panel.id}/>)
//  console.log(panels)

  return (
    <div className='content'>
      <div className="title-holder">
        <h1 className='title'>Poke Mems</h1>
      </div>
      { status.gameOver || status.allSeen ?(
         <div>
          <h1>{status.gameOver ? "Game Over" : "You win!"}</h1>
          <p>Your Score was {status.gameOver ? Math.ceil((status.score/2 ))-1 : Math.ceil(status.score/2)}</p>
          <button onClick={() => window.location.reload()}>Play Again?</button>
          <div className="score-holder">
            <p className='high-score'>High Score: {status.highScore}</p>
          </div>
        </div>)
      :(
        <div>
          <div className='panel-holder'>
            {boardElements}
          </div>
          <div className="score-holder">
            <h1>Score: {Math.ceil(status.score /2)}</h1> 
            <p className='high-score'>High Score: {status.highScore}</p>
            <h2> {status.seen ? " You win" : ""}</h2>
          </div>
        </div>)
      }
    </div>
  )
}

export default App


//* Slight bug... pokemon can show up multiple times if the odds are good enough so idk if theres a way to make sure this doesnt happe... my high score is 4.5....

