import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RuleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ruleType, setRuleType] = useState('');
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [adjustmentPercentage, setAdjustmentPercentage] = useState('');
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    fetchRule();
  }, []);

  const fetchRule = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dealers/2/rules/${id}`);
      const { rule_type, adjustment_value, adjustment_percentage, conditions } = response.data;
      setRuleType(rule_type);
      setAdjustmentValue(adjustment_value);
      setAdjustmentPercentage(adjustment_percentage);
      setConditions(conditions);
    } catch (error) {
      console.error('Error fetching rule:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/dealers/2/rules/${id}`, {
        rule_type: ruleType,
        adjustment_value: adjustmentValue,
        adjustment_percentage: adjustmentPercentage,
        conditions_attributes: conditions
      });
      navigate(`/`);
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { vehicle_attribute: '', operator: '', value: '' }]);
  };

  const handleChangeCondition = (index, event) => {
    const { name, value } = event.target;
    const updatedConditions = [...conditions];
    updatedConditions[index][name] = value;
    setConditions(updatedConditions);
  };

  const handleDeleteConditionGroup = (index) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  return (
    <div className="rule-form">
      <h2>Edit Rule</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rule Type:</label>
          <select className="rule-type-select" value={ruleType} onChange={(e) => setRuleType(e.target.value)}>
            <option value="">Select Rule Type</option>
            <option value="include">Include</option>
            <option value="exclude">Exclude</option>
          </select>
        </div>
        <div className="form-group">
          <label>Adjustment Value:</label>
          <input type="text" value={adjustmentValue} onChange={(e) => setAdjustmentValue(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Adjustment Percentage:</label>
          <input type="text" value={adjustmentPercentage} onChange={(e) => setAdjustmentPercentage(e.target.value)} />
        </div>
        <h3>Conditions</h3>
        {conditions.map((condition, index) => (
          <div className="condition-group" key={index}>
            <div className="form-group">
              <label>Vehicle Attribute:</label>
              <select name="vehicle_attribute" className="rule-type-select" value={condition.vehicle_attribute} onChange={(e) => handleChangeCondition(index, e)}>
                <option value="">Select Vehicle Attribute</option>
                <option value="make">Make</option>
                <option value="model">Model</option>
                <option value="year">Year</option>
                <option value="mileage">Mileage</option>
                <option value="base_price">Base Price</option>
                <option value="trim">Trim</option>
                <option value="engine_type">Engine Type</option>
                <option value="body_type">Body Type</option>
                <option value="title_type">Title Type</option>
              </select>
            </div>
            <div className="form-group">
              <label>Operator:</label>
              <select name="operator" className="rule-type-select" value={condition.operator} onChange={(e) => handleChangeCondition(index, e)}>
                <option value="">Select Operator</option>
                <option value="==">==</option>
                <option value="!=">!=</option>
                <option value="in">in</option>
                <option value="nin">nin</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value:</label>
              <input type="text" name="value" value={condition.value} onChange={(e) => handleChangeCondition(index, e)} />
            </div>
            <button type="button" onClick={() => handleDeleteConditionGroup(index)}>Delete Condition Group</button>
          </div>
        ))}
        <div style={{ marginBottom: '10px' }}>
          <button type="button" onClick={handleAddCondition}>Add Condition</button>
        </div>
        <div>
          <button type="submit" disabled={conditions.length === 0}>Update</button>
        </div>
        
      </form>
    </div>
  );
}

export default RuleForm;
