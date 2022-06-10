import React, { useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Swal from "sweetalert2"; 
// components
import Grid from './Grid'
import Keypad from './Keypad'
import axios from 'axios'
// import Modal from './Modal'

export default function Wordle(props) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup,buttonClick } = useWordle(props.solution)
  // const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup) 
    if (isCorrect) {
          setTimeout(() => 
          Swal.fire({  
            title: `You won! +${7-turn} points`,  
            text: `You found the correct word after ${turn} tries`,  
            icon: 'success',  
            confirmButtonColor:"#f66c1f",  
            confirmButtonText: 'Next Challenge',
            allowOutsideClick:false
          }).then((result)=>{
            if(result.isConfirmed){
              Swal.fire({
                title: 'Updating Score board',
                html: 'and loading new challenge...',
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                },
              }).then((result) => {
                axios({
                  method:"POST",
                  url:"https://wordleapp.herokuapp.com/addscore",
                  data:{
                    username:window.location.pathname.slice(1)+localStorage.getItem("country"),
                    score:7-turn
                  }
                }).then(()=>{
                  localStorage.removeItem("solution")
                  localStorage.removeItem("savedGame")
                  window.location.reload()
                })
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })

              axios({
                method:"POST",
                url:"https://wordleapp.herokuapp.com/addscore",
                data:{
                  username:window.location.pathname.slice(1)+localStorage.getItem("country"),
                  score:7-turn
                }
              }).then(()=>{
                localStorage.removeItem("solution")
                localStorage.removeItem("savedGame")
                window.location.reload()
              })
            }
          })
          , 2000)

    
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5 && !isCorrect) {
      let freeAttempts = JSON.parse(localStorage.getItem("freeAttempts"))
      localStorage.setItem('freeAttempts',freeAttempts+1)
      setTimeout(() => 
      Swal.fire({  
        title: 'You lost!',  
        html: `You ran out of chances!. The correct answer is <span style="color:red;font-weight:bold">${props.solution}</span>`,  
        icon: 'error',  
        confirmButtonColor: '#eb3f3f',   
        confirmButtonText: 'Try again'
      }).then((result)=>{

        if(result.isConfirmed && (freeAttempts < 6 || props.userData.expiryDate > Date.now())){
          localStorage.removeItem("solution")
          localStorage.removeItem("savedGame")
          window.location.reload()
        }
        else{
          Swal.fire({
            title: "You have used all your free attempts",
            icon:"error",
            text:"To continue playing, you need to pay for a Tell! Books subscription",
            confirmButtonColor:"#f66c1f",
            confirmButtonText: 'Go to subscription',
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.href = "https://books.tell.africa/subscribe"
            }

          })
        }
      })
      , 2000)
      window.removeEventListener('keyup', handleKeyup)
   
    }

    

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn,props.solution,props.userData.expiryDate ])

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
