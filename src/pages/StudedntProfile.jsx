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

  if (!studentData)
    return (
      <div className="w-full text-2xl font-bold text-center text-zinc-500 p-24">
        <p>Loading Profile...</p>
      </div>
    );

  //   -===============----
  return (
    <>
      <div className="flex flex-col w-100 mx-auto pt-20">
        <h1 className="font-bold text-3xl text-center">My Profile</h1>
        <div className="bg-zinc-50 border border-zinc-300 mt-8 rounded-lg p-8 text-lg space-y-2">
          <p>
            <strong className="w-20 inline-block">Name:</strong>
            {studentData.name}
          </p>
          <p>
            <strong className="w-20 inline-block">Email:</strong>
            {studentData.email}
          </p>
          <p>
            <strong className="w-20 inline-block">Role:</strong>
            {studentData.role}
          </p>
        </div>
      </div>
    </>
  );
};

export default StudedntProfile;
