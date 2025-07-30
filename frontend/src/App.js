import React from "react";
import UserForm from "./components/UserForm";
import CandidateProfileForm from "./components/CandidateProfileForm";

function App() {
  return (
    <div>
      <h1>Exam Management Frontend</h1>
      <UserForm />
      <hr />
      <CandidateProfileForm />
    </div>
  );
}

export default App;
