import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Swal from "sweetalert2"; 
// components
import Grid from './Grid'
import Keypad from './Keypad'
// import Modal from './Modal'

export default function Wordle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup,buttonClick } = useWordle(solution)
  // const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    if (isCorrect) {
      setTimeout(() => 
      Swal.fire({  
        title: 'You won!',  
        text: `You found the correct word after ${turn} tries`,  
        icon: 'success',  
        confirmButtonColor: '#eb3f3f',   
        confirmButtonText: 'Next Challenge'
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.reload()
        }
      })
      , 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5 && !isCorrect) {
      setTimeout(() => 
      Swal.fire({  
        title: 'You lost!',  
        text: `You ran out of chances. The correct answer is ${solution}`,  
        icon: 'error',  
        confirmButtonColor: '#eb3f3f',   
        confirmButtonText: 'Try again'
      })
      , 2000)
      window.removeEventListener('keyup', handleKeyup)
   
    }

    

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn,solution])

  function helloWorld(a){
    buttonClick(a)
  }

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad handleKeyup={helloWorld} usedKeys={usedKeys} />
      {/* {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />} */}
    </div>
  )
}
