import React, { useEffect, useState } from 'react';

const Tracker = () => {
    const [myData, setMyData] = useState([]);
    const [expense, setExpense] = useState("");
    const [ammount, setAmmount] = useState("");
    const [budget, setBudget] = useState(2000);
    const [newBudget, setNewBudget] = useState(budget);
    const [display, setDisplay] = useState(false);
    const [expendAmnt, setExpend] = useState(0);
    const [edit, setEditStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        setExpend(totalExpend(myData));
    }, [myData]);

    const totalExpend = (data) => {
        return data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    }

    const myBudget = (e) => {
        setNewBudget(e.target.value);
    }

    const addBudget = () => {
        setBudget(parseFloat(newBudget));
        setNewBudget("");
        setDisplay(false);
    }

    const myExpense = (e) => {
        setExpense(e.target.value);
    }

    const myAmmount = (e) => {
        setAmmount(e.target.value);
    }

    const addExpense = () => {
        if (edit) {
            // Edit existing expense
            const updatedData = [...myData];
            updatedData[editIndex] = { expense, amount: ammount };
            setMyData(updatedData);
            setEditStatus(false);
            setEditIndex(null);
        } else {
            // Add new expense
            const newData = { expense, amount: ammount };
            setMyData([...myData, newData]);
        }

        // Reset form fields
        setExpense("");
        setAmmount("");
    }

    const editExpense = (index) => {
        setEditStatus(true);
        setEditIndex(index);

        // Pre-fill form fields with existing data
        setExpense(myData[index].expense);
        setAmmount(myData[index].amount);
    }

    const deleteExpense = (index) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this expense?");
        if (shouldDelete) {
            const updatedData = [...myData];
            updatedData.splice(index, 1);

            setMyData(updatedData);
        }
    }

    return (
        <>
            <div className="expense-tracker-app">
                <div className="upper">
                    <h1>React Js Expense Tracker</h1>
                    <div className='tracker'>
                        <div className='budget'>
                            <p className='amnt amnt-btn'>Budget: Rs. {budget}</p>
                            <button className='btn' onClick={() => setDisplay(true)}>Edit</button>
                        </div>
                        <div className='expenses'>
                            <p className='amnt'>Expended: Rs. {expendAmnt}</p>
                        </div>
                        <div className='remaning'>
                            <p className='amnt'>Remaining: Rs. {budget - expendAmnt}</p>
                        </div>
                    </div>
                </div>
                {display && (
                    <div className="edit-budget">
                        <div>
                            <label>Enter your Budget</label>
                            <input type="number" className='myBudget' onChange={myBudget} value={newBudget} placeholder='enter your budget..' />
                        </div>
                        <div>
                            <button onClick={addBudget}>Add Budget</button>
                        </div>
                    </div>
                )}
                <div className="lower">
                    <div className="add-expense">
                        <h2 className='title'>{edit ? "Edit Expense" : 'Add Expenses'}</h2>
                        <div className="inputFields">
                            <input type="text" className='data' onChange={myExpense} name='expense' value={expense} placeholder='enter expense' />
                            <input type="number" className='data' onChange={myAmmount} name='amount' value={ammount} placeholder='enter amount' />
                            <button className='add-btn' onClick={addExpense}>{edit ? "Save" : "Add Expense"}</button>
                        </div>
                    </div>
                    <div className="expense-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.expense}</td>
                                        <td>Rs. {item.amount}</td>
                                        <td>
                                            <button className='add-btn' onClick={() => editExpense(index)}>Edit</button>
                                            <button className='add-btn' onClick={() => deleteExpense(index)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tracker;
