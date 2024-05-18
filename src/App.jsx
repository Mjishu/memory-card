
import './App.css'
import React from 'react'
import Board from './components/Board.jsx'
import { nanoid } from 'nanoid'

function App() {
  const [panels, setPanels] = React.useState(populatePanels())

  function createPanels(){
    return{
      value: "" ,//* This should be whats in React.useEffect how to store api value here...
      isSeen:false,
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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    fetchData();
  }, []);~

  console.log(panels)

  function handleClick(id){
      console.log("clicked" , id)
  }

 const boardElements = panels.map((panel,index) => <Board name={panel.name} value={panel.value} key={index} handleClick={handleClick} id={index}/>)
//  console.log(panels)

  return (
    <>
    <div className='panel-holder'>
      {boardElements}
    </div>
    </>
  )
}

export default App