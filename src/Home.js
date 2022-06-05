import React from 'react'
import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'


function Home() {
    const [solution, setSolution] = useState(null)
  
    useEffect(() => {
      fetch('https://wordleapp.herokuapp.com/solutions')
        .then(res => res.json())
        .then(json => {
          // random int between 0 & 14
          const randomSolution = json[Math.floor(Math.random()*json.length)]
          setSolution(randomSolution.word)
        })
    }, [setSolution])


  return (
    <div className="App">
      <h1>Wordle By Tell! Books</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}

export default Home