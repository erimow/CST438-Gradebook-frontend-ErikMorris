import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddAssignment(props) { 

  const [message, setMessage] = useState('');
  const [assign, setAssign] = useState([]);
  const [factors, setFactors] = useState({assName:"", assId:0, classId:0, assDueDate:"", courseName:""});

  const saveAssignment = ( ) => {
    setMessage('');
    console.log("Assignment.save ");  
    factors.name=   
    fetch(`${SERVER_URL}/assignment` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify({
            id:factors.assId,
            assignmentName:factors.assName,
            dueDate:factors.assDueDate,
            courseTitle:factors.courseName,
            courseId:factors.classId
          })
        } )
    .then(res => {
        if (res.ok) {
          //fetchGrades(assignmentId);
          setMessage("Assignment saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save assignment error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save assignment exception =' + err);
      });
 };        

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFactors(prevFactors => ({
    ...prevFactors,
    [name]: name === 'assId' || name === 'classId' ? parseInt(value, 10) : value
  }));
};

 

  return (
      <div>
        <h3>Add Assignment</h3>
        <h4 id="amessage" >{message}&nbsp;</h4>
        <h5>Assignment Name</h5>
        <input name="assName" value={factors.assName || ""} type="text" onChange={(e) => handleChange(e)}/>
        <hr/> <h5>Assignment Id</h5>
        <input name='assId' value={(factors.assId)? factors.assId:""} type="number" onChange={(e) => handleChange(e)}/>
        <hr/><h5>Due Date</h5>
        <input name='assDueDate' value={(factors.assDueDate)? factors.assDueDate:""} type='text' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Course Title</h5>
        <input name='courseName' value={(factors.courseName)? factors.courseName:""} type='text' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Course Id</h5>
        <input name='classId' value={(factors.classId)? factors.classId:""} type="number" onChange={(e) => handleChange(e)}/> <hr></hr>
        <button id='sassign' type="button" margin="auto" onClick={saveAssignment}>Save Assignment</button> <br></br>
        <button><Link to={`/`}>Back</Link></button>
      </div>
  ); 
}

export default AddAssignment;