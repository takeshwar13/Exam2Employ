import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [user, setUser] = useState({ username: "", password: "", role: "CANDIDATE" });
  const [searchUsername, setSearchUsername] = useState("");
  const [userResult, setUserResult] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:9090/api/user/create", user);
    setUserResult(res.data);
  };

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:9090/api/user/username/${searchUsername}`);
    setUserResult(res.data);
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleCreate}>
        <input name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="CANDIDATE">CANDIDATE</option>
          <option value="RECRUITER">RECRUITER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Create</button>
      </form>

      <h3>Search User</h3>
      <input placeholder="Username" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {userResult && (
        <pre>{JSON.stringify(userResult, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserForm;
