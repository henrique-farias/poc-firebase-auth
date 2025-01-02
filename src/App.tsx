import * as React from 'react'
import './App.css'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import 'dotenv/config'

function App() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  }
  const firebaseApp = initializeApp(config)
  const auth = getAuth(firebaseApp)
  const googleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithRedirect(auth, provider)
      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }

  const emailSignUp = async (): Promise<void> => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((e) => console.error(e))
  }

  const emailSignIn = async (): Promise<void> => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((e) => console.error(e))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      POC Firebase Auth
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Sign in</h3>
          <input
            style={{
              padding: '10px 20px',
              margin: '10px',
              borderRadius: '5px',
              border: '1px solid gray',
              backgroundColor: 'transparent',
              color: 'black',
            }}
            type="text"
            placeholder="email"
            onChange={handleEmailChange}
          />
          <input
            style={{
              padding: '10px 20px',
              margin: '10px',
              borderRadius: '5px',
              border: '1px solid gray',
              backgroundColor: 'transparent',
              color: 'black',
            }}
            type="text"
            placeholder="senha"
            onChange={handlePasswordChange}
          />
        </div>
        <Button onClick={emailSignUp}>Sign Up with Email</Button>
        <Button onClick={emailSignIn}>Sign In with Email</Button>
        <Button onClick={googleSignIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}

const Button = ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<any>) => {
  const styles: React.CSSProperties = {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    border: '1px solid orangered',
    backgroundColor: 'chocolate',
    color: 'white',
    cursor: 'pointer',
  }
  return (
    <button {...props} style={styles}>
      {children}
    </button>
  )
}

export default App
