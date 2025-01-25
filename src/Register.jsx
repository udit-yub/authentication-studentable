import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase';
import { Link } from 'react-router';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          firstname: fname,
          lastname: lname,
        });
        console.log('user successfully registered');
        toast.success('Registered successfully', { position: 'top-center' });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleregister} className="space-y-4">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            Have an account?{' '}
            <Link to={'/'} className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
          <div className="cursor-pointer mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
