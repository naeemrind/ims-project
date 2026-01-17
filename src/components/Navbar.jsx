import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login");
  };

  if (!user) return null; // we only show navbar if a user is logged in

  return (
    <>
      <h1 className="font-bold text-3xl p-5 pb-10 text-center select-none">
        Institute Management System
      </h1>
      <nav className="flex justify-center gap-3 select-none">
        {/* Admin Links */}
        {role === "admin" && (
          <>
            <Link className="Link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="Link" to="/courses">
              Courses
            </Link>
            <Link className="Link" to="/students">
              Students
            </Link>
            <Link className="Link" to="/assign-course">
              Assign Course
            </Link>
          </>
        )}
        {/* Student Links */}
        {role === "student" && (
          <>
            <Link className="Link" to="/student/dashboard">
              Dashboard
            </Link>
            <Link className="Link" to="/my-courses">
              My Courses
            </Link>
            <Link className="Link" to="/profile">
              Profile
            </Link>
          </>
        )}
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
