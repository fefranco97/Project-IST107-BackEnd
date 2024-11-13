// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCfVDyHw9-eiA-wP2aNToYBZRPFyWNQSfw',
  authDomain: 'projectrecipesist107.firebaseapp.com',
  projectId: 'projectrecipesist107',
  storageBucket: 'projectrecipesist107.firebasestorage.app',
  messagingSenderId: '927015619683',
  appId: '1:927015619683:web:7340c980ea3f0acc567c56',
  measurementId: 'G-8WSF0W43D8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Database setup

const database = getFirestore(app)

module.exports = { database }
