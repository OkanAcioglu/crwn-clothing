import { async } from '@firebase/util'
import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
//! We are keeping the same values that we need for createUserDocumentFromAuth
//! Primarely we need displayName and email
//! We do not actually store password inside the database. Password considered as sensitive information. Instead we want to leverage Firebase Authentication , which will figure out whether or not the password matches with the user. But they hide that from us so that even if somehow our firebase gets hacked or a firestorm gets hacked passwords do not get leaked...
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('Password do not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      //console.log(response)
      //! we get UserCredential and inside it we get user object, access token but we did not pass a displayName because we have not done yet. displayName here is not coming back to us inside of the user auth. But how could it? We just created this user. Reason why this user object is the same is because Firebase is making sure that across all of its different ways that we can authenticate expecting same shape. Whether or not there is a value or not entirely up to the authentication method itself. Reason why for Google there is a display name is because in Google when you set up your user, you have tell Google what your name is which we did not do that. But we dont need to do because in this case what we are going to do is going to use displayName in the form and store it into the database...
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user,email already in use')
      } else {
        console.log('user creation encountered an error', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handSubmit}>
        <label htmlFor=''>Display Name</label>
        <input
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <label htmlFor=''>Email</label>
        <input
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <label htmlFor=''>Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <label htmlFor=''>Confirm Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
