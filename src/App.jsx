
import './App.css'
import React from 'react'
import Board from './components/Board.jsx'
import { nanoid } from 'nanoid'

function App() {
  const [panels, setPanels] = React.useState(populatePanels)
  const [loading, setLoading] = React.useState(true)
  const [score, setScore] = React.useState(0)

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
        setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    fetchData();
  }, []);

  console.log(panels)

  function handleClick(id){
    setPanels(oldPanels=>{
      const clickedItem = oldPanels.find(item => item.id === id);
      const updatedPanels = oldPanels.map(panel => 
        panel.id === id ? {...panel,isSeen:!clickedItem.isSeen} : panel
      )
      return updatedPanels
    }) 
    setScore(score + 1)
  }

  if(loading){
    <div>Loading...</div>
  }

 const boardElements = panels.map((panel,index) => <Board name={panel.name} value={panel.value} key={panel.id} handleClick={handleClick} id={panel.id}/>)
//  console.log(panels)

  return (
    <div className='content'>
    <div className='panel-holder'>
      {boardElements}
    </div>
    <h1>Score: {score}</h1>
    </div>
  )
}

export default App


//* Slight bug... pokemon can show up multiple times if the odds are good enough so idk if theres a way to make sure this doesnt happen
// todo: find a way to shuffle the pokemon inside of panels without updating it