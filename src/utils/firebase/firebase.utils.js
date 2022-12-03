import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCei0eRMv1WTMeocXkQK0n2HQQBnLw42jw',
  authDomain: 'crwn-clothing-db-cf613.firebaseapp.com',
  projectId: 'crwn-clothing-db-cf613',
  storageBucket: 'crwn-clothing-db-cf613.appspot.com',
  messagingSenderId: '22219405089',
  appId: '1:22219405089:web:e4c7777a19ac10afb6b060',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
