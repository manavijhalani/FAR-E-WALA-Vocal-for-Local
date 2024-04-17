import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDM-SSjSjDzaYDBn1x1PJR0oi4Q5e_Dcnc",
  authDomain: "farewala-569aa.firebaseapp.com",
  projectId: "farewala-569aa",
  storageBucket: "farewala-569aa.appspot.com",
  messagingSenderId: "499790925683",
  appId: "1:499790925683:web:12da0e00ad9b9c8b87bf06",
  measurementId: "G-YRKVP16HML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//const provider = new GoogleAuthProvider();

/*export const SignInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result)=>{
    console.log(result);
    const name=result.user.displayName;
    localStorage.setItem("name" , name) ;

    }).catch((error)=>{
    console.log(error);
    })
};*/


