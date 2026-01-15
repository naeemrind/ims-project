import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user) return;
      const q = query(
        collection(db, "enrollments"),
        where("studentId", "==", user.uid)
      );
      const enrollmentSnap = await getDocs(q);
      const coursePromises = enrollmentSnap.docs.map(async (enrollment) => {
        const courseId = enrollment.data().courseId;
        const courseDoc = await getDoc(doc(db, "courses", courseId));
        return { id: courseDoc.id, ...courseDoc.data() };
      });
      const coursesData = await Promise.all(coursePromises);
      setMyCourses(coursesData);
    };
    fetchMyCourses();
  }, [user]);

  //   ==========
  return (
    <>
      <div>
        <h1>My Enrolled Courses</h1>
        {myCourses.map((course) => (
          <li key={course.id}>
            <span>
              {" "}
              {course.name} - {course.duration}{" "}
            </span>
          </li>
        ))}
      </div>
    </>
  );
};

export default MyCourses;
