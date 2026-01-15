import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (user) {
        const q = query(
          collection(db, "enrollments"),
          where("studentId", "==", user.uid)
        );
        const snap = await getDocs(q);
        setEnrollmentCount(snap.size);
      }
    };
    fetchEnrollments();
  }, [user]);

  //   --=--=
  return (
    <>
      <div>
        <h1>Student Dashboard</h1>
        <p>Name: {user?.email}</p>
        <p>Email: {user?.email}</p>
        <div>
          <h2>Enrolled Courses</h2>
          <h2>{enrollmentCount}</h2>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
