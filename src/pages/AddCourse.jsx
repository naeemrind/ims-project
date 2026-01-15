import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        name,
        description: desc,
        duration,
      });
      alert("Course added");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      alert("Error adding course");
    }
  };

  //   --
  return (
    <>
      <div>
        <h1>Add New Course</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Course Name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Course Description.."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Course Duration (e.g. 6 Weeks)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button type="submit">Add Course</button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
