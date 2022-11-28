import Link from "next/link";
import { reg } from "firebase/auth";
import { useState } from "react";
import { createUserWithEmailAndPassword, collection } from "firebase/auth";
import { auth } from "../utils/firebase";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, currentUser } = useAuth();
  const router = useRouter();

  const push = () => {
    router.push("/");
  };

  const register = async () => {
    try {
      await signup(email, password);
      window.alert("Account Created Succesfully!");
      push();
    } catch (error) {
      window.alert(error.message);
    }
    //window.location.reload(true);
  };
  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>SIGN-UP PAGE</h1>
        </div>
        <div className="signinform">
          <div className="input">
            <input
              type={"text"}
              placeholder={"Enter Email"}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={"password"}
              placeholder={"Enter Password"}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={register}>Sign Up</button>
        </div>
        <div className="navigate">
          <Link href={"/"} className={"link"}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
