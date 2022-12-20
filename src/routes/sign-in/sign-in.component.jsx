import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    //const response = await signInWithGooglePopup()
    //console.log(response)
    //! We want response.user object
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Pop up</button>
    </div>
  )
}

export default SignIn
