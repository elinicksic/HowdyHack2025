import react from 'react';
const FirebaseContext = react.createContext(null);
 
export const withFirebase = (Component) => (props) => (
 <FirebaseContext.Consumer>
   {(firebase) => <Component {...props} firebase={firebase} />}
 </FirebaseContext.Consumer>
);
 
export default FirebaseContext;
// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();
