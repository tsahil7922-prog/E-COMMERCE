// src/pages/Admin/UserManagement.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addUser,
  deleteUser,
  updateUser,
  fetchUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
console.log(localStorage.getItem("userToken"))
  const { users, loading, error } = useSelector(
    (state) => state.admin
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  // ================= CHECK ADMIN =================

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // ================= FETCH USERS =================

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  // ================= UPDATE ROLE =================

  const handleRoleChange = (userId, newRole) => {
    dispatch(
      updateUser({
        id: userId,
        role: newRole,
      })
    );
  };

  // ================= DELETE USER =================

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        User Management
      </h2>

      {loading && <p>Loading...</p>}

      {error && (
       <p>Error: {error?.message || error}</p>
      )}

     

      <div className="mb-6 p-6 border rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">
          Add New User
        </h3>

        <form onSubmit={handleSubmit}>
          {/* NAME */}

          <div className="mb-4">
            <label className="block text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* EMAIL */}

          <div className="mb-4">
            <label className="block text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-4">
            <label className="block text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* ROLE */}

          <div className="mb-4">
            <label className="block text-gray-700">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">
                Customer
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr
                key={user?._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-900">
                  {user?.name}
                </td>

                <td className="p-4">
                  {user?.email}
                </td>

                <td className="p-4">
                  <select
                    value={user?.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user?._id,
                        e.target.value
                      )
                    }
                    className="p-2 border rounded"
                  >
                    <option value="customer">
                      Customer
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDeleteUser(user?._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;