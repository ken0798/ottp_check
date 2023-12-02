import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut  } from "firebase/auth";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const SignInGoogle = async() => {
 return await new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
.then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
  const user = result.user;
  resolve({
    user,
    token
  })
// IdP data available using getAdditionalUserInfo(result)
// ...
}).catch((error) => {
// Handle Errors here.
// The AuthCredential type that was used.
  // ...
  reject(error)
});
  })
}

export const RegisterWithEmail = async ({email,password}) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    resolve(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    reject({errorCode,errorMessage})
    // ..
  });
  })
}

export const LoginWithEmail = async ({email,password}) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    resolve(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    reject({errorCode,errorMessage})
  });
  })
}

export const googleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('TOKEN')
  }).catch((error) => {
    // An error happened.
  });
}