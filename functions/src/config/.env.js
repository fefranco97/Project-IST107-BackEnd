// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
