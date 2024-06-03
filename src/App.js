import React, { useState, useEffect } from 'react';

function App() {
  const initialAllocations = {
    marketing: 50,
    finance: 300,
    sales: 70,
    humanResource: 40,
    IT: 500
  };

  const [allocations, setAllocations] = useState(initialAllocations);
  const [totalBudget, setTotalBudget] = useState(2000); // Total budget value in euros
  const [currency, setCurrency] = useState('€'); // Default currency
  const [changeDepartment, setChangeDepartment] = useState('');
  const [changeAction, setChangeAction] = useState('');
  const [changeAmount, setChangeAmount] = useState('');

  const totalSpent = Object.values(allocations).reduce((acc, cur) => acc + cur, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleAllocationChange = (department, value) => {
    if (!isNaN(value)) {
      const intValue = parseInt(value);
      if (intValue <= remainingBudget) {
        setAllocations((prevAllocations) => ({
          ...prevAllocations,
          [department]: intValue
        }));
      } else {
        setAllocations((prevAllocations) => ({
          ...prevAllocations,
          [department]: remainingBudget
        }));
      }
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleBudgetChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= totalSpent) {
      setTotalBudget(newValue);
    }
  };

  const handleIncreaseBudget = (department) => {
    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [department]: prevAllocations[department] + 10
    }));
  };

  const handleDecreaseBudget = (department) => {
    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [department]: Math.max(prevAllocations[department] - 10, 0)
    }));
  };

  const handleDepartmentChange = (e) => {
    setChangeDepartment(e.target.value);
  };

  const handleActionChange = (e) => {
    setChangeAction(e.target.value);
  };

  const handleAmountChange = (e) => {
    setChangeAmount(e.target.value);
  };

  const handleSaveChanges = () => {
    if (changeDepartment && changeAction && !isNaN(changeAmount)) {
      const intValue = parseInt(changeAmount);
      if (changeAction === 'add') {
        setAllocations((prevAllocations) => ({
          ...prevAllocations,
          [changeDepartment]: prevAllocations[changeDepartment] + intValue
        }));
      } else if (changeAction === 'subtract') {
        setAllocations((prevAllocations) => ({
          ...prevAllocations,
          [changeDepartment]: Math.max(prevAllocations[changeDepartment] - intValue, 0)
        }));
      }
    }
    // Reset input fields
    setChangeDepartment('');
    setChangeAction('');
    setChangeAmount('');
  };

  return (
    <div>
    <h1 style={{ fontWeight: 'bold' }}>Company's Budget Allocation</h1>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
  <div>
    <label htmlFor="budget">Budget:</label>
    {currency}<input type="number" id="budget" value={totalBudget} onChange={handleBudgetChange} />
  </div>
  <div style={{ marginRight: '10px' }}>
    <p>Remaining: {currency} {remainingBudget}</p>
  </div>
  <div style={{ marginRight: '10px' }}>
    <p>Spent so far: {currency} {totalSpent}</p>
  </div>
  <div style={{ marginRight: '10px' }}>
<button>Currency</button>
<select value={currency} onChange={handleCurrencyChange}>
  <option value="$">$ Dollar</option>
  <option value="£">£ Pound</option>
  <option value="€">€ Euro</option>
  <option value="₹">₹ Rupee</option>
</select></div>
</div>
<br/>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Allocated Budget</th>
            <th>Increase by 10</th>
            <th>Decrease by 10</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(allocations).map(([department, value]) => (
            <tr key={department}>
              <td>{department}</td>
              <td>{currency} {value}</td>
              <td><button onClick={() => handleIncreaseBudget(department)}>+</button></td>
              <td><button onClick={() => handleDecreaseBudget(department)}>-</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <h3>Change Allocation</h3>
      <div>
        <button>Department</button> <select value={changeDepartment} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          {Object.keys(allocations).map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        <button>Allocation</button>
        <select value={changeAction} onChange={handleActionChange}>
          <option value="">Select Action</option>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option> 
        </select>
    
       {currency} <input type="number" value={changeAmount} onChange={handleAmountChange} />
        <button onClick={handleSaveChanges}>Save</button>
      </div>
      <br/>
      
      
    </div>
  );
}

export default App;
