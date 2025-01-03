import * as React from 'react'
import './App.css'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import 'dotenv/config'

function App() {
  const [env, setEnv] = React.useState('')
  const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
  const isWebView = (): boolean => {
    const userAgent = navigator.userAgent
    return /(wv|WebView)/i.test(userAgent)
  }

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
      if (isMobile()) {
        if (isWebView()) {
          setEnv('webview')
          return
        }
      }
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }

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
      POC Firebase Auth {env}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button onClick={googleSignIn}>Sign in with Google</Button>
        {env === 'webview' && (
          <a href="http://10.0.2.2:3000" target="_blank" rel="noopener noreferrer">
            Ir para o navegador
          </a>
        )}
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
