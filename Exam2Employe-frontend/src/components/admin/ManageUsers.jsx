import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, deleteUser } from '../../api/userApi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      await createUser(form);
      setForm({ name: '', email: '', password: '', role: 'USER' });
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <form onSubmit={handleCreateUser} className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            type="email"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">All Users</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
