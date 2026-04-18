import React, { useState } from "react";

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //default role
  });

  const users = [{ id: 1, name: "sahil", email: "bcsiqbid@12", role: "admin" }];
  const handleChange = (e) => {
    let { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log(userId, newRole);
  };
  const handleDelteUser = (id) => {
    if(window.confirm("sure to dlt this id")){
console.log("id")
    }
  }
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="text-2xl font-bold mb-6">UserManagement</h2>
      {/* New user form */}
      <div className="mb-6 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="" className="text-gray-700 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="text-gray-700 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="text-gray-700 block">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white rpounded bg-green-500 py-2 px-4 hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>
      {/* user list Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-gray-500 text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3-px-4">Name</th>
              <th className="py-3-px-4">Email</th>
              <th className="py-3-px-4">Role</th>
              <th className="py-3-px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user?.name}
                </td>
                <td className="p-4 ">{user?.email}</td>
                <td className="p-4 ">
                  <select
                    name=""
                    value={user?.role}
                    onChange={(e) => handleRoleChange(user?.id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 ">
                  <button
                    onClick={() => handleDelteUser(user?.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >Delete</button>
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
