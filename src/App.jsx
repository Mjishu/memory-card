
import './App.css'
import React from 'react'
import Board from '../components/Board.jsx'

function App() {
  const [panels, setPanels] = React.useState([])

  React.useEffect(() => {
    async function fetchData() { //I think I should turn boardBody into an arr of objects 
      const boardBody = [];
      for (let i = 0; i <= 10; i++) {  
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i*5}`);
          const data = await response.json();
          boardBody.push(data.sprites.front_default);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setPanels(boardBody);
    }
    fetchData();
  }, []);

  function handleClick(){
      console.log("clicked")
  }

 const boardElements = panels.map((panel,index) => <Board value={panel} key={index} handleClick={handleClick}/>)
 console.log(panels)

  return (
    <>
      {boardElements}
    </>
  )
}

export default App

