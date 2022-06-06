import React,{useState,useEffect} from 'react'

function Scoreboard() {
  const [scores,setScores] = useState([])

    useEffect(()=>{
        fetch('https://wordleapp.herokuapp.com/scoreboard')
        .then(res => res.json())
        .then(json => {
          let scores = json.sort((a,b)=>b.score-a.score)
            setScores(scores)

        })
    },[])

    
  return (
    <div>

<table>
  <thead>
  <tr>
    <th>Rank</th>
    <th>Player</th>
    <th>Score</th>
  </tr>
  </thead>
    {scores.map((score,i)=>(
       <tbody key={i}>
       <tr>
      <td>{i+1===1?<img alt="gold" src="https://img.icons8.com/external-justicon-flat-justicon/40/undefined/external-gold-medal-reward-and-badges-justicon-flat-justicon.png"/>:i+1}</td>
       <td >{score.username}</td>
       <td >{score.score}</td>
     </tr>
    
    
    
     </tbody>
    ))}

</table>
    </div>
  )
}

export default Scoreboard