//import { useEffect } from 'react'
//import { getRedirectResult } from 'firebase/auth'

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  //! what useEffect does when app comeback from redirect and re-initialize get me the response from redirect that just happened based on the auth
  //! Think auth as some kind of authentication memory bank tracking all of our auth process
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth)
  //   console.log(response)
  // }, [])
  // useEffect(() => {
  //   const resultGetRedirectResult = async () => {
  //     const response = await getRedirectResult(auth)
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user)
  //     }
  //   }
  //   resultGetRedirectResult()
  // }, [])
  const logGoogleUser = async () => {
    //const response = await signInWithGooglePopup()
    //console.log(response)
    //! We want response.user object
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  //! Below setup our User Authenticated into the firestore but there is no user in the console? Why? Because our app completely redirected entirely to a new separate domain. When we came back our app does not know that there was some previous instant of state of this website that we were being paused for. When we get rid of everythink app will be unmount. When we came back we simply re-initialize our entire app from the start.
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect()
  //   console.log({ user })
  // }
  //! to tackle that we need to import "useEffect" , "getRedirectResult" (async) and "auth" (what getRedirectResult get...) then we run useEffect and other 2 import in the SignIn above...

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Pop up</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  )
}

export default SignIn
