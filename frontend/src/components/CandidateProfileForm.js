import React, { useState } from "react";
import axios from "axios";

const CandidateProfileForm = () => {
  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    education: "",
    skills: ""
  });
  const [candidateId, setCandidateId] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const body = {
      user: { id: parseInt(profile.userId) },
      fullName: profile.fullName,
      education: profile.education,
      skills: profile.skills.split(",").map(s => s.trim())
    };
    const res = await axios.post("http://localhost:9090/api/candidate-profile/create", body);
    setResult(res.data);
  };

  const handleFetch = async () => {
    const res = await axios.get(`http://localhost:9090/api/candidate-profile/${candidateId}`);
    setResult(res.data);
  };

  return (
    <div>
      <h2>Create Candidate Profile</h2>
      <form onSubmit={handleCreate}>
        <input name="userId" placeholder="User ID" value={profile.userId} onChange={handleChange} />
        <input name="fullName" placeholder="Full Name" value={profile.fullName} onChange={handleChange} />
        <input name="education" placeholder="Education" value={profile.education} onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma-separated)" value={profile.skills} onChange={handleChange} />
        <button type="submit">Create</button>
      </form>

      <h3>Get Candidate Profile</h3>
      <input placeholder="Profile ID" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} />
      <button onClick={handleFetch}>Fetch</button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default CandidateProfileForm;
