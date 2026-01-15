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
        where("role", "==", "student")
      );
      const sSnap = await getDocs(sQuery);
      setStudents(
        sSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      const cSnap = await getDocs(collection(db, "courses"));
      setCourses(
        cSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
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
      <div>
        <h1>Assign Course to Student</h1>
        <form onSubmit={handleAssign}>
          <select
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
          <button>Assign</button>
        </form>
      </div>
    </>
  );
};

export default AssignCourse;
