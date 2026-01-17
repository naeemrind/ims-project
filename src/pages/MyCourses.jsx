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
        where("studentId", "==", user.uid),
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
      <div className="flex flex-col w-100 mx-auto pt-20">
        <h1 className="font-bold text-3xl text-center">My Enrolled Courses</h1>
        {myCourses.map((course) => (
          <li
            key={course.id}
            className="bg-zinc-50 border rounded-lg border-zinc-300 p-6 gap-3 items-start flex flex-col justify-center mt-8"
          >
            <span>
              <strong>Name:</strong> &nbsp; {course.name}
            </span>
            <span>
              <strong>Duration:</strong> &nbsp; {course.duration}
            </span>
          </li>
        ))}
      </div>
    </>
  );
};

export default MyCourses;
