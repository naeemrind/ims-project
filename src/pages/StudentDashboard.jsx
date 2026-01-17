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
          where("studentId", "==", user.uid),
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
      <div className="flex flex-col w-100 mx-auto pt-20">
        <h1 className="font-bold text-3xl text-center">Student Dashboard</h1>
        <div className="p-4 flex flex-col gap-2">
          <p>
            <strong>Name:</strong> &nbsp; {user?.email}
          </p>
          <p>
            <strong>Email:</strong> &nbsp; {user?.email}
          </p>
          <div className="bg-green-100 w-80 mx-auto text-center space-y-2 p-6 mt-6 text-lg font-bold border border-green-400 rounded-lg select-none">
            <h2>Enrolled Courses</h2>
            <h2>{enrollmentCount}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
