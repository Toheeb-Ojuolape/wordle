import React from 'react'
import Swal from 'sweetalert2'
import {doc, getDoc} from "firebase/firestore"
import {db} from "./db"


function Login(props) {
    const [username, setUsername] = React.useState('')

    React.useEffect(()=>{
        Swal.fire({
            title: 'Enter your Tell! Books username',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Login',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                const userRef = doc(db,"users",login)
                setUsername(login)
              return getDoc(userRef)
                .then(response => {
                  console.log(response)
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
             window.location.href="/"+username
            }
          })
    },[props,username])

    return(
        <div>

        </div>
    )
 
}

export default Login