import React from 'react'
import Swal from 'sweetalert2'
// import {doc, getDoc} from "firebase/firestore"
// import {db} from "./db"


function Login(props) {
    const [username, setUsername] = React.useState('')

    React.useEffect(()=>{
        Swal.fire({
            title: 'Enter your Tell! Books username',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: false,
            confirmButtonText: 'Login',
            showLoaderOnConfirm: true,
            confirmButtonColor:"#f66c1f",
           
            allowOutsideClick: false,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                  setUsername(value)
                  window.location.href="/"+value.replaceAll(" ","-").toLowerCase()
                  resolve()
              })
            }
          })

    },[props,username])

    return(
        <div>

        </div>
    )
 
}

export default Login