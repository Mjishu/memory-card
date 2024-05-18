
import './App.css'
import React from 'react'
import Board from './components/Board.jsx'
import { nanoid } from 'nanoid'

function App() {
  const [panels, setPanels] = React.useState([])

  function createPanels(){
    return{
      value: "" ,//* This should be whats in React.useEffect how to store api value here...
      isSeen:false,
      id:nanoid()
    }
  }

  function populatePandels(){ //? This should be called in React.useState 
    const newPanel = [];
    for (let i =0;i<10;i++){
      newPanel.push(createPanels())
    }
    return newPanel
  }

  React.useEffect(() => { //? Could I call populatePandels, and then in this for loop append the url to each of the value indexes that correlate with the index in panels?
    async function fetchData() { //I think I should turn boardBody into an arr of objects 
      for (let i = 1; i <= 10; i++) {  
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i*5}`);
          const data = await response.json();
          setPanels(oldpanel => oldpanel[i].value = data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    fetchData();
  }, []);

  console.log(panels)

  function handleClick(id){
      console.log("clicked" , id)
  }

 const boardElements = panels.map((panel,index) => <Board value={panel} key={index} handleClick={handleClick} id={index}/>)
//  console.log(panels)

  return (
    <>
      {boardElements}
    </>
  )
}

export default App