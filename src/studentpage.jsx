import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB8Kyy0mPpYsx2ZXf7WqPNR9vuA6KcUPJI",
  authDomain: "student-details-62348.firebaseapp.com",
  projectId: "student-details-62348",
  storageBucket: "student-details-62348.firebasestorage.app",
  messagingSenderId: "960746100200",
  appId: "1:960746100200:web:17c00cc16442b824ea005d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    class: "",
    section: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parentName: "",
    parentContact: "",
    notes: "",
  });

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = await getDocs(collection(db, "students"));
      const studentsList = studentsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), formData);
      setModalOpen(false);
      toast.success("Student added succesfully")
      window.location.reload();
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      toast.success("student deleted succesfully")
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  return (
    <div className="flex">
    <Sidebar />
    <div className="min-h-screen bg-gray-100 p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Students List</h1>

      <button
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Add Student
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Section</th>
              <th className="px-4 py-2 text-left">Roll Number</th>
              <th className="px-4 py-2 text-left">D.O.B</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone no.</th>
              <th className="px-4 py-2 text-left">email</th>
              <th className="px-4 py-2 text-left">P.name</th>
              <th className="px-4 py-2 text-left">P.no</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.class}</td>
                <td className="px-4 py-2">{student.section}</td>
                <td className="px-4 py-2">{student.rollNumber}</td>
                <td className="px-4 py-2">{student.dob}</td>
                <td className="px-4 py-2">{student.gender}</td>
                <td className="px-4 py-2">{student.address}</td>
                <td className="px-4 py-2">{student.phone}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.parentName}</td>
                <td className="px-4 py-2">{student.parentContact}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => alert(JSON.stringify(student))}
                  >
                    View
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => setFormData(student) || setModalOpen(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add/Edit Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <input 
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="text"
                />

                {/* Roll Number */}
                <input
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="number"
                />

                {/* Class */}
                <input
                  name="class"
                  placeholder="Class"
                  value={formData.class}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="text"
                />

                {/* Section */}
                <input
                  name="section"
                  placeholder="Section"
                  value={formData.section}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="text"
                />

                {/* Date of Birth */}
                <input
                  name="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="date"
                />

                {/* Gender */}
                <div className="flex items-center">
                  <label className="mr-2 font-medium">Gender:</label>
                  <div className="flex items-center gap-2">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        checked={formData.gender === "Male"}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        checked={formData.gender === "Female"}
                      />
                      Female
                    </label>
                  </div>
                </div>

                {/* Address */}
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full col-span-2"
                  required
                  type="text"
                />

                {/* Phone Number */}
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="tel"
                />

                {/* Email */}
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="email"
                />

                {/* Parent Name */}
                <input
                  name="parentName"
                  placeholder="Parent Name"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="text"
                />

                {/* Parent Contact */}
                <input
                  name="parentContact"
                  placeholder="Parent Contact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                  type="tel"
                />

                <textarea
                  name="notes"
                  placeholder="Additional Notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 w-full col-span-2"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default StudentsPage;
