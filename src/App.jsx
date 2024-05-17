import React from 'react'
import './App.css'

function App() {
  const [panels, setPanels] = React.useState([])

  React.useEffect(()=>{
    const newPanels = []
    for(let i=1; i<=10;i++){
      newPanels.push(i)
    }
    setPanels(newPanels)
  },[])



  React.useEffect(()=>{
    const pokemonIndex = [3,1,2,23,34,65, 30, 46, 78, 18];
    const newData = pokemonIndex.map(index => (
      fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then(res => res.json())
      .then(data => data.sprites.front_default)
      .catch(error => console.log(error))
    ));
    setPanels(oldPanels => [...oldPanels, newData])
  },[])

  console.log(panels)

  

  function panelsMapped(){
    return panels.map((panel) => (
        <img key={panel.id} src={panel}/>
    ))
  }
  return (
    <>
      <div className="panel-holder">
        {panelsMapped}
      </div>
    </>
  )
}

export default App

//? set up an object in state that has a nanoid and an isSeen element that is default false, if the card with that id is clicked then switch
// ? the isSeen to true and if it is clicked again then game over

//* Break it down -> use state with n amount of cards; on these cards show a number and put this array of numbers inside useState -> change numbres to an img url

// photos by pokeAPI

//todo: I think i need to do a for loop inside the useEffect for n amounts and use a random number for the pokemon/ bc if i used 1-10 it will just
//todo: be base pokemon and their evolutions