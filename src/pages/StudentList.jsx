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
      <div className="flex flex-col w-150 mx-auto pt-10">
        <h1 className="font-bold text-3xl text-center">All Students</h1>
        <Link
          to="/students/add"
          className="bg-blue-700 font-medium py-2 rounded-lg cursor-pointer w-fit px-4 mx-auto hover:bg-blue-800 text-white my-8"
        >
          Add New Student
        </Link>
        <ul>
          {students &&
            students.map((student) => (
              <li
                key={student.id}
                className="bg-zinc-50 border rounded-lg border-zinc-300 p-4 items-center flex justify-between"
              >
                <span>
                  <strong>Name:</strong> &nbsp; {student.name}
                </span>
                <span>
                  <strong>Email:</strong> &nbsp; {student.email}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default StudentList;
