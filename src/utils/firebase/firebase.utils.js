import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  // for sign-up with email and password
  createUserWithEmailAndPassword,
} from 'firebase/auth'

// import Firestore services
//! getFirestore --> instantiate firestore instance
//! doc --> retrieve documents inside of firestore database (get a document instance)
//! getDoc , setDoc --> getting or setting documents data (access and set the data on document)
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
//! below we named as signInWithGoogleRedirect because provider instantiated as classes (with Google). These providers can be for example Facebook provider and there is multiple providers available...
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)
// create database --> db will directly points database
export const db = getFirestore()

// create a function which is async and receives user authentication object that what we are get back from firebase authentication
// function will take data (getting from auth service) and store that inside of firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //! whether there is existing document reference
  //! reference is a special type of object that firestore uses when talking about actual instance of a document modal
  //* 3 arguments of doc
  //1 db --> database
  //2 collections --> we gonna call it users collection
  //3 identifier --> unique id (When we look the response (user object that comes with access token) when we signInWithGooglePopup there is a uid which is "unique id identifier". We will use this uid... )
  //!!! Right now we are creating user instance inside the firestorm. We never done that before and we will use that userAuth.uid... İt is interesting that Google Firestorm ,eventhough we do not have a document reference inside our database (we do not even have a user collection), generate the object for us... But when invoke the createUserDocumentFromAuth function into the sign-in component with user argument we see a object in the console. This object is actually the object that represents some document reference in the database. However we do not have a value but in the object there is uid we just used and the path that points to the collection of users. But we know that nothing exist there(no data we can get from there). Why Google create this for us? Because this reference points to the some unique point inside of the database. Google wants us to use this specific document reference object that they provided us in order to set data there because it is already pointing to the some place inside of our database.
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid) // give me the document reference, inside of the database, under the user collection, with the userAuth.uid
  console.log(userDocRef)
  //? userSnapShot --> kind of data , also the specific kind of object...
  const userSnapShot = await getDoc(userDocRef)
  console.log(userSnapShot) // new document snap shot --> points to same identifier --> but this is a special object --> on this object we can check whether or not document exist... ( for now we know it doesnt)
  console.log(userSnapShot.exists())

  // if user data does not exist
  if (!userSnapShot.exists()) {
    // create/set the document with the data from userAuth in the collection
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  //check if user data exist --> above if block will not be executed
  // return userDocRef
  return userDocRef
}
//! Below what we made is Authenticated user. This is not necessarily a user document inside of our firestore instance
//!
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
