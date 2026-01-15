import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const studentSnap = await getDocs(collection(db, "users"));
      const students = studentSnap.docs.filter(
        (doc) => doc.data().role === "student"
      );
      setTotalStudents(students.length);
      const courseSnap = await getDocs(collection(db, "courses"));
      setTotalCourses(courseSnap.size);
    };
    fetchData();
  }, []);

  //   ----
  return (
    <>
      <div>
        <h1>Admin Dashboard</h1>
        <div>
          <div>
            <h2>Total Students</h2>
            <h2>{totalStudents}</h2>
          </div>
          <div>
            <h2>Total Courses</h2>
            <h2>{totalCourses}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
