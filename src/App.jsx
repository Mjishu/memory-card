
import './App.css'
import Board from '../components/Board'

function App() {
 
  return (
    <>
      <div className="panel-holder">
        <Board/>
        <p>meow</p>
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
//todo: be base pokemon and