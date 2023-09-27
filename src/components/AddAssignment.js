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
            courseTitle:factors.courseTit,
            courseId:factors.classId
          })
        } )
    .then(res => {
        if (res.ok) {
          //fetchGrades(assignmentId);
          setMessage("Grades saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save grades error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save grades exception =' + err);
      });
 };        

  return (
      <div>
        <h3>Add Assignment</h3>
        <h4 id="amessage" >{message}&nbsp;</h4>
        <h5>Assignment Name</h5>
        <input name="assignmentName" value={(factors.assName)? factors.assName:""} type="text" onChange={handleChange}/>
        <hr/> <h5>Assignment Id</h5>
        <input name='id' value={(factors.assId)? factors.assId:""} type="number" onChange={setFactors(value)}/>
        <hr/><h5>Due Date</h5>
        <input name='dueDate' value={(factors.assDueDate)? factors.assDueDate:""} type='text' onChange={handleChange}/>
        <hr/><h5>Course Title</h5>
        <input name='courseName' value={(factors.courseTit)? factors.courseTit:""} type='text' onChange={handleChange}/>
        <hr/><h5>Course Id</h5>
        <input name='classId'ref="classId" type="number"/>
        <button id='sassign' type="button" margin="auto" onClick={saveAssignment}>Save Assignment</button>
      </div>
  ); 
}

export default AddAssignment;