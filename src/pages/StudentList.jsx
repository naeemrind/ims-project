import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../redux/studentSlice";
import { Link } from "react-router";

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.studentsList);

  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, "users"), where("role", "==", "student"));
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setStudents(studentsData));
    };
    fetchStudents();
  }, [dispatch]);

  //   ----
  return (
    <>
      <div>
        <h1>All Students</h1>
        <Link to="/students/add">Add New Student</Link>
        <ul>
          {students &&
            students.map((student) => (
              <li key={student.id}>
                {student.name} ({student.email})
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default StudentList;
