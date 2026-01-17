import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router";
import { log } from "firebase/firestore/pipelines";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const docRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        //   saving to redux
        dispatch(
          setUser({
            user: { email: firebaseUser.email, uid: firebaseUser.uid },
            role: userData.role,
          }),
        );
        if (userData.role === "admin") navigate("/dashboard");
        else navigate("/student/dashboard");
      } else {
        setError("User data not found");
      }
    } catch (err) {
      console.log(err.code, err.message);

      setError("Invalid email or password");
    }
  };

  //   ---------
  return (
    <>
      <h1 className="font-bold text-3xl p-6 text-center select-none">
        Institute Management System
      </h1>
      <div className="flex flex-col w-100 mx-auto pt-24">
        <h1 className="font-bold text-3xl text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col pt-10 gap-2 p-2">
          <input
            className="border px-5 py-2 font-medium rounded-lg border-zinc-500"
            type="email"
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border px-5 py-2 font-medium rounded-lg border-zinc-500"
            type="password"
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-700 font-medium py-2 rounded-lg cursor-pointer hover:bg-blue-800 text-white mt-8 select-none"
          >
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Login;
