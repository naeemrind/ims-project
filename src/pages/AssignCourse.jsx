import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const AssignCourse = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      const sQuery = query(
        collection(db, "users"),
        where("role", "==", "student"),
      );
      const sSnap = await getDocs(sQuery);
      setStudents(
        sSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
      const cSnap = await getDocs(collection(db, "courses"));
      setCourses(
        cSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    };
    fetchOptions();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "enrollments"), {
        studentId: selectedStudent,
        courseId: selectedCourse,
      });
      alert("Course assigned successfuly");
    } catch (err) {
      console.error(err);
    }
  };

  //   ====
  return (
    <>
      <div className="flex flex-col w-150 mx-auto pt-14">
        <h1 className="font-bold text-3xl text-center">
          Assign Course to Student
        </h1>
        <form
          onSubmit={handleAssign}
          className="flex flex-col pt-10 gap-2 p-2 w-100 mx-auto"
        >
          <select
            className="border px-5 py-2 font-medium rounded-lg border-zinc-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            className="border px-5 py-2 font-medium rounded-lg border-zinc-500"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button className="bg-blue-700 font-medium py-2 rounded-lg cursor-pointer hover:bg-blue-800 text-white mt-8 select-none">
            Assign
          </button>
        </form>
      </div>
    </>
  );
};

export default AssignCourse;
