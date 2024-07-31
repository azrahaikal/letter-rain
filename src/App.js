import React from "react"
import {nanoid} from "nanoid"
import Form from "../src/components/Form"

export default function App(){
  const[letter, addLetter] = React.useState([])

  function randomLetter(){
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return char[Math.floor(Math.random() * char.length)]
  }

  function handleAddLetter(){
    var fontSize2 = Math.floor(Math.random() * 50 + 20)
    var speed;
    if(fontSize2 <= 24){
      speed = 0.2
    }
    else if(fontSize2 > 24 && fontSize2 <= 28){
      speed = 0.7
    }
    else if(fontSize2 > 28 && fontSize2 <=32){
      speed = 1.3
    }
    else if(fontSize2 > 32 && fontSize2 <=36){
      speed = 1.9
    }
    else if(fontSize2 > 40 && fontSize2 <=44){
      speed = 2.5
    }
    else if(fontSize2 > 44){
      speed = 3.2
    }

    const newLetter = {
      value : randomLetter(),
      id : nanoid(),
      coorX : Math.floor((Math.random() * (window.innerWidth-80)) + 35  ),
      coorY : -90,
      fontSizeee : fontSize2,
      speed : speed,
      isHover : false
    }
    addLetter(prevLetter => [...prevLetter, newLetter])
    //console.log(`number of letter: ${letter.length + 1}. new letter's size is ${newLetter.fontSizeee}px`)
  }

  const[selectedLetter, setSelectedLetter] = React.useState(({
    value: "",
    uniqueId: ""
  }))

  function handleClickLetter(event){
    const clicked = event.target.getAttribute("key2")
    //console.log(`number of letter: ${letter.length - 1}`)
    addLetter(prevList => prevList.filter(letter => letter.id !== clicked))
    setSelectedLetter(({
      value: event.target.textContent,
      uniqueId: clicked
    }))
  }

  // menurunkan 1 letter
  React.useEffect(() =>{
   const intervalId = setInterval(() => {
    addLetter(prevLetter => prevLetter.map(letter => ({...letter, 
      coorY: (letter.isHover ? letter.coorY : letter.coorY + letter.speed)
    })));
    addLetter(prevLetter => prevLetter.filter(letter => letter.coorY <= window.innerHeight - 200));

    if(letter.length < 9){
      handleAddLetter()
      handleAddLetter()
    }

   },30);
  
  return () => clearInterval(intervalId); 
  },
  [letter.length]
  )

  function handleHover(event){
    const id = event.target.getAttribute("key2")

    addLetter(prevList => prevList.map(oneLetter => 
    (oneLetter.id === id ? {...oneLetter, isHover: true} : oneLetter)
    ))
  }

  function handleLeave(event){
    const id = event.target.getAttribute("key2")

    addLetter(prevList => prevList.map(oneLetter => 
    (oneLetter.id === id ? {...oneLetter, isHover: false} : oneLetter)
    ))
  }

  const h2Letter = letter.map(oneLetter => 
  <h2 style={{
    position: 'absolute',
    left: `${oneLetter.coorX}px`,
    fontSize: `${oneLetter.fontSizeee}px`,
    top: `${oneLetter.coorY}px`,
    cursor: "pointer"
    
  }} key={oneLetter.id}
    key2={oneLetter.id}
    name={oneLetter.id}
    onClick={handleClickLetter}
    onMouseOver={handleHover}
    onMouseLeave={handleLeave}
    className="unselectable">
    {oneLetter.value}</h2>)

  return(

    <div>

      <Form selectedLetterValue={selectedLetter.value} selectedLetterId={selectedLetter.uniqueId}/>
      
      {h2Letter}
          
    </div>

  )
}