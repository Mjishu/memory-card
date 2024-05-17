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
    fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(res => res.json())
    .then(data => setPanels(data.sprites.front_default))
    .catch(error => console.log(error))
  },[])

  // function panelsMapped(){
  //   return panels.map((panel) => (
  //       <p key={panel}>{panel}</p>
  //   ))
  // }
  return (
    <>
      <div className="panel-holder">
        <img src={panels} alt="" />
      </div>
    </>
  )
}

export default App

//? set up an object in state that has a nanoid and an isSeen element that is default false, if the card with that id is clicked then switch
// ? the isSeen to true and if it is clicked again then game over

//* Break it down -> use state with n amount of cards; on these cards show a number and put this array of numbers inside useState -> change numbres to an img url

// photos by pexels