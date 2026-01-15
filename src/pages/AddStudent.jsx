import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "student",
      });
      alert("Student added successfuly");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error adding Student");
    }
  };

  //   ---
  return (
    <>
      <div>
        <h1>Add Student</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter student Full Name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter student Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter a Password for the student.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
