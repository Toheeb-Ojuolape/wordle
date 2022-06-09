import React, { useEffect, useState } from 'react'
import Wordle from './components/Wordle'
import Scoreboard from './components/Scoreboard';
import {db} from "./db"
import {doc,getDoc} from "firebase/firestore"
import countryFlagEmoji from "country-flag-emoji";

function Home() {
    const [userData,setUserData] = useState({})
    const [country,setCountry] = useState("")
    // Get the button that opens the modal
    // Get the <span> element that closes the modal
    var modal = document.getElementById("myModal");
    var tutorialModal = document.getElementById("tutorialModal")
    var inviteModal = document.getElementById("inviteModal")


  window.addEventListener('click',function(e){
    if (e.target === modal || e.target === tutorialModal || e.target === inviteModal) {
      modal.style.display = "none";
      tutorialModal.style.display = "none"
      inviteModal.style.display = "none"
    }
  })

    const [solution, setSolution] = useState(null)
    const savedSolution  = localStorage.getItem("solution")
    useEffect(() => {
      setCountry(countryFlagEmoji.get("NG").emoji)
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
    }, [setSolution,savedSolution,setCountry],)

    useEffect(()=>{
      const userRef = doc(db,"users",window.location.pathname.slice(1))
      getDoc(userRef).then(doc=>{
        setUserData(doc.data())
      })
    },[])

    function showScoreBoard(){
      modal.style.display = "block"
    }

    function showTutorial(){
      tutorialModal.style.display = "block"
    }

    function showInvite(){
      inviteModal.style.display = "block"
    }

    function closeModal(){
      modal.style.display = "none";
    }

    function closeTutorial(){
      tutorialModal.style.display = "none";
    }

    function closeInvite(){
      inviteModal.style.display = "none";
    }

    function shareWhatsApp(){
      window.open(`https://wa.me/?text=I%20enjoy%20playing%20Wordle%20on%20Tell!%20Books.%20Let%20us%20Play%20Wordle%20Together%20on%20Tell!%20Books%20https://books.tell.africa/signup`)
    }

    function shareTwitter(){
      window.open(`https://twitter.com/intent/tweet?text=Let's%20play%20Wordle%20Together%20on%20Tell%20Books.%20Get%20started%20here%20https://books.tell.africa/signup`)
    }

    function shareFacebook(){
      window.open(`https://facebook.com/sharer/sharer.php?description=Let%20us%20play%20Wordle%20together%20on%20Tell!%20Books&u=https://books.tell.africa/signup`)
    }

    

  return (
    
    <div className="App">
      <h1><button className="button" onClick={()=>showTutorial()} style={{fontSize:"14px"}}><img alt="tutorial" src="https://img.icons8.com/ios/20/undefined/info--v1.png"/></button> Wordle By Tell! Books <button className="button" onClick={()=>showScoreBoard()}><img alt="scoreboard" src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/24/undefined/external-podium-reputation-bearicons-detailed-outline-bearicons.png"/></button> <button className="buttonInvite" onClick={()=>showInvite()}><img alt="invite" src="https://img.icons8.com/external-thin-kawalan-studio/24/undefined/external-user-plus-users-thin-kawalan-studio.png"/></button></h1>
      {solution && <Wordle solution={solution} userData={userData} />}
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


<div id="tutorialModal" className="modal-container">
  {/* Instructions */}
  <div className="modal-content">
    <div className="modal-header">
      <span onClick={closeTutorial} className="closeTutorial">&times;</span>
    </div>
    <div className="modal-body">
      <img style={{width:"60%",objectFit:"cover"}} src="https://i.ibb.co/82yFPdY/Capture.png" alt="instructions" />
    </div>
  </div>
</div>

<div id="inviteModal" className="modal-container">
  {/* Instructions */}
  <div className="modal-content">
    <div className="modal-header">
      <span onClick={closeInvite} className="closeTutorial">&times;</span>
    </div>
    <div className="inviteBody">
      <p>Invite your friends (and foes) to play Wordle on Tell! Books {country}</p>
    <button onClick={()=>shareWhatsApp()} className="button"><img alt="whatsAPP" src="https://img.icons8.com/color/50/undefined/whatsapp--v1.png"/></button>
    <button onClick={()=>shareTwitter()} className="button"><img alt="twitter" src="https://img.icons8.com/color/50/undefined/twitter-circled--v1.png"/></button>
    <button onClick={()=>shareFacebook()} className="button"><img alt="facebook" src="https://img.icons8.com/color/50/undefined/facebook-new.png"/></button>
    
    </div>
  </div>
</div>


    </div>
  )
}

export default Home