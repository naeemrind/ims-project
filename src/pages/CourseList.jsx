import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/courseSlice";
import { Link } from "react-router";

const CourseList = () => {
  const dispatch = useDispatch();
  // const courses = useSelector((state) => state.courses.CourseList);
  const courses = useSelector((state) => {
    console.log("Full Redux State:", state); // <--- X-Ray Log
    return state.courses?.coursesList;
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setCourses(coursesData));
    };
    fetchCourses();
  }, [dispatch]);
  console.log("Data coming from Redux:", courses);

  //   --
  return (
    <>
      <div>
        <h1>All Courses</h1>
        <Link to="/courses/add">Add New Course</Link>
        <ul>
          {courses &&
            courses.map((course) => (
              <li key={course.id}>
                <span>
                  {course.name} - {course.duration}
                </span>
                <span>{course.description}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CourseList;
