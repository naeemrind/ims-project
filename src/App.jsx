import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./pages/AddCourse";
import CourseList from "./pages/CourseList";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import AssignCourse from "./pages/AssignCourse";
import StudentDashboard from "./pages/StudentDashboard";
import MyCourses from "./pages/MyCourses";
import StudedntProfile from "./pages/StudedntProfile";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase/firebase";
import { setUser, logoutUser } from "./redux/authSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(
            setUser({
              user: { email: user.email, uid: user.uid },
              role: docSnap.data().role,
            }),
          );
        }
      } else {
        dispatch(logoutUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // ----------------
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          {/* Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/add"
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assign-course"
            element={
              <ProtectedRoute>
                <AssignCourse />
              </ProtectedRoute>
            }
          />
          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <StudedntProfile />
              </ProtectedRoute>
            }
          />
          {/* Redirection for unknown route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
