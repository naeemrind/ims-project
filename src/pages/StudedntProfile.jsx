import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const StudedntProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Redux User Object: ", user);

      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Firestore data found: ", docSnap.data());
            setStudentData(docSnap.data());
          } else {
            console.error("No document found for this ID");
            setError("Not found in Database");
          }
        } catch (err) {
          console.error("Error fetching Profile", err);
          setError("Error fetching data");
        }
      } else {
        setError("User ID missing from login session");
      }
    };
    fetchProfile();
  }, [user]);

  if (error) return <p>Error</p>;

  if (!studentData) return <p>Loading Profile...</p>;

  //   -===============----
  return (
    <>
      <div>
        <h1>My Profile</h1>
        <div>
          <p>Name: {studentData.name}</p>
          <p>Email: {studentData.email}</p>
          <p>Role: {studentData.role}</p>
        </div>
      </div>
    </>
  );
};

export default StudedntProfile;
