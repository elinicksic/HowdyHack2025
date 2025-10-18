// In any component or page
import { auth, db } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, get } from "firebase/database";

// Example: Authentication
const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Example: Firestore
const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

const getData = async () => {
    try {
      const headerRef = ref(db, 'data'); // Get ref of 'data'
      const snapshot = await get(headerRef); // Get data of 'data'
      return snapshot.val();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  };
