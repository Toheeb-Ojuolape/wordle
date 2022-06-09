import React, { useState } from 'react'
export default function Keypad(props) {
  const [letters] = useState(
    [
      {"key": "a"},
      {"key": "b"},
      {"key": "c"},
      {"key": "d"},
      {"key": "e"},
      {"key": "f"},
      {"key": "g"},
      {"key": "h"},
      {"key": "i"},
      {"key": "j"},
      {"key": "k"},
      {"key": "l"},
      {"key": "m"},
      {"key": "n"},
      {"key": "o"},
      {"key": "p"},
      {"key": "q"},
      {"key": "r"},
      {"key": "s"},
      {"key": "t"},
      {"key": "Enter"},
      {"key": "u"},
      {"key": "v"},
      {"key": "w"},
      {"key": "x"},
      {"key": "y"},
      {"key": "z"},
      {"key": "Backspace"}
    ]


  )

  function tryMe(a){
    props.handleKeyup(a)
  }

  // useEffect(() => {
  //   fetch('http://localhost:3001/letters')
  //     .then(res => res.json())
  //     .then(json => {
  //       setLetters(json)
  //     })
  // }, [])


  return (
    <div className="keypad">
      {letters && letters.map(l => {
        const color = props.usedKeys[l.key]
        return (
          <div  onClick={()=>tryMe(l.key)} key={l.key} className={l.key==="Backspace" || l.key ==="Enter" ? "enter":color}>{l.key === "Backspace" ? '⌫':l.key}</div>
          )
      })}
    </div>
  )
}
