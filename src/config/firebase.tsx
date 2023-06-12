import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyAd5Zq7wtSsi1hHqcr5xYfa57P_w9npnlQ",
	authDomain: "crud-todo-85607.firebaseapp.com",
	projectId: "crud-todo-85607",
	storageBucket: "crud-todo-85607.appspot.com",
	messagingSenderId: "354617131603",
	appId: "1:354617131603:web:8f9f5bc62fded5ced7bca6"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db};