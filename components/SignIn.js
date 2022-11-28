import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import {useState} from "react"
import { useAuth } from "../context/AuthContext";


function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login,currentuser} = useAuth();
    console.log(currentuser);

    const signIn = async() => {
        try {
            await login(email,password);
            //window.alert("Account Created Succesfully!");
        } catch (error) {
            window.alert(error.message);
        }
        //window.location.reload(true);
    }
  return (
    <div>
      <div className="container">
        <div className="heading">
            <h1>LOG-IN PAGE</h1>
        </div>
        <div className="signinform">
            <div className="input">
            <input type={"text"} placeholder={"Enter Email"} required onChange={(e)=> setEmail(e.target.value)}/>
            <input type={"password"} placeholder={"Enter Password"} required onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button onClick={signIn}>Login</button> 
        </div>
        <div className="navigate">
            <Link href={"/SignUp"} className={"link"}>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
