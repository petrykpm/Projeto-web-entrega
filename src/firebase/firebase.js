import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyA9M-OVSZJRKQmdoA7zgOhhzQfrcC5bpus",
  authDomain:        "projeto-web-1d1ea.firebaseapp.com",
  projectId:         "projeto-web-1d1ea",
  storageBucket:     "projeto-web-1d1ea.firebasestorage.app",
  messagingSenderId: "881827421105",
  appId:             "1:881827421105:web:65bd4c16a0b43c58163b90",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db   = getFirestore(app)
