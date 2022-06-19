import React, { useState } from 'react'
export default function Keypad(props) {
  const [letters] = useState(
    [
      {"key": "q"},
      {"key": "w"},
      {"key": "e"},
      {"key": "r"},
      {"key": "t"},
      {"key": "y"},
      {"key": "u"},
      {"key": "i"},
      {"key": "o"},
      {"key": "p"},
      {"key": "a"},
      {"key": "s"},
      {"key": "d"},
      {"key": "f"},
      {"key": "g"},
      {"key": "h"},
      {"key": "j"},
      {"key": "k"},
      {"key": "l"},
      {"key": "z"},
      {"key": "Enter"},
      {"key": "x"},
      {"key": "c"},
      {"key": "v"},
      {"key": "b"},
      {"key": "n"},
      {"key": "m"},
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
