import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RuleList() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dealers/2/rules`);
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleShow = (id) => {
    // Implement handleShow functionality if needed
  };

  const handleCreate = () => {
    navigate(`/rules/new`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/dealers/2/rules/${id}`);
      setRules(rules.filter(rule => rule.id !== id));
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  return (
    <div>
      <button style={{ marginBottom: '10px', float: 'left', display: 'inline-block' }} className="edit-button" onClick={handleCreate}>Create Rule</button>
      <table className="rule-table">
        <thead>
          <tr>
            <th>Rule Type</th>
            <th>Adjustment Value</th>
            <th>Adjustment Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <tr key={rule.id}>
              <td>{rule.rule_type}</td>
              <td>{rule.adjustment_value}</td>
              <td>{rule.adjustment_percentage}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(rule.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(rule.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RuleList;
