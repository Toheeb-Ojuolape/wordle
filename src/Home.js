import React, { useEffect, useState } from 'react'
import Wordle from './components/Wordle'
import Scoreboard from './components/Scoreboard';
import {db} from "./db"
import {doc,getDoc} from "firebase/firestore"


function Home() {
    const [userData,setUserData] = useState({})
    // Get the button that opens the modal
    // Get the <span> element that closes the modal
    var modal = document.getElementById("myModal");

  
 


  window.addEventListener('click',function(e){
    if (e.target === modal) {
      modal.style.display = "none";
    }
  })

    const [solution, setSolution] = useState(null)
    const savedSolution  = localStorage.getItem("solution")
    useEffect(() => {
      fetch('https://wordleapp.herokuapp.com/solutions')
        .then(res => res.json())
        .then(json => {
          // random int between 0 & 14
          const randomSolution = json[Math.floor(Math.random()*json.length)]
          if(savedSolution == null){
          setSolution(randomSolution.word)
          localStorage.setItem('solution', randomSolution.word)
          }
          else{
          setSolution(savedSolution)
          }
        })
    }, [setSolution,savedSolution],)

    useEffect(()=>{
      const userRef = doc(db,"users",window.location.pathname.slice(1))
      getDoc(userRef).then(doc=>{
        setUserData(doc.data())
      })
    },[])

    function showScoreBoard(){
      modal.style.display = "block"
    }

    function closeModal(){
      modal.style.display = "none";
    }

    

  return (
    
    <div className="App">
      <h1>Wordle By Tell! Books</h1>
      {solution && <Wordle solution={solution} userData={userData} />}
      <button className="button" onClick={()=>showScoreBoard()}>View Score Board</button>
      <div id="myModal" className="modal-container">

  {/* Scoreboard */}
  <div className="modal-content">
    <div className="modal-header">
      <span onClick={closeModal} className="close">&times;</span>
      <h2>Scoreboard</h2>
    </div>
    <div className="modal-body">
      <Scoreboard/>
    </div>
  </div>

</div>
    </div>
  )
}

export default Home