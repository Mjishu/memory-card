import React from "react"
// import nanoid from "nanoid"


export default function Board(){
    const [panels, setPanels] = React.useState([])

    React.useEffect(()=>{
      const newPanels = []
      for(let i=1; i<=10;i++){
        newPanels.push(i)
      }
      setPanels(newPanels)
    },[])

  
    function panelsMapped(){
      return panels.map((panel) => (
        //   <img key={nanoid()} src={panel}/>
        <p key={panel}>{panel}</p>
      ))
    }

    return(
        <div>
            <h1>{panelsMapped}</h1>
        </div>
    )
}