import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditForm from './EditForm';
import RuleForm from './RuleForm';
import RuleList from './RuleList';

function App() {
  return (
    <Router>
      <div>
        <h1><Link to="/">Rules</Link></h1>
        <Routes>
          <Route path="/edit/:id" element={<EditForm/>} />
          <Route path="/rules/new" element={<RuleForm/>} />
          <Route path="/" exact element={<RuleList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
