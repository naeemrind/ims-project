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
        (doc) => doc.data().role === "student",
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
      <div className="flex flex-col w-100 mx-auto pt-20">
        <h1 className="font-bold text-3xl text-center">Admin Dashboard</h1>
        <div className="p-8 pt-16 text-center font-semibold flex flex-col items-center gap-8">
          <div className="bg-zinc-100 text-lg w-64 rounded-lg border border-zinc-400 py-4 space-y-2">
            <h2>Total Students</h2>
            <h2>{totalStudents}</h2>
          </div>
          <div className="bg-zinc-100 text-lg w-64 rounded-lg border border-zinc-400 py-4 space-y-2">
            <h2>Total Courses</h2>
            <h2>{totalCourses}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
