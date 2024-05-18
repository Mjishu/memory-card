// import React from "react"
// import nanoid from "nanoid"


export default function Board(props){
  // console.log("props", props)
    return(
      <div >
          <img src={props.value} alt="" onClick={()=>props.handleClick(props.id)}/>
          <h3>{props.name}</h3>
       </div>
    )
}

//todo  {
//     id: nanoid() 
//     imgUrl: ""
//     seen: false
// }

// todo: find a way to get images from an api, set some of them up on the cards, if they card was clicked set seen to true, reshuffle cards and if the card thats clicked is seen then game over and return the number
//todo: of cards that were clicked before game over