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
      <div className="flex flex-col w-150 mx-auto pt-10">
        <h1 className="font-bold text-3xl text-center">All Courses</h1>
        <Link
          to="/courses/add"
          className="bg-blue-700 font-medium py-2 rounded-lg cursor-pointer w-fit px-4 mx-auto hover:bg-blue-800 text-white my-8"
        >
          Add New Course
        </Link>
        <ul>
          {courses &&
            courses.map((course) => (
              <li
                key={course.id}
                className="bg-zinc-100 border flex flex-col gap-3 border-zinc-300 p-5 rounded-lg"
              >
                <span className="font-bold text-lg">
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
