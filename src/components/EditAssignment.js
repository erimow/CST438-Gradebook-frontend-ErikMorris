import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function EditAssignment(props) { 

  const [message, setMessage] = useState('');
  const [factors, setFactors] = useState({assName:"", assId:0, classId:0, assDueDate:"", courseName:""});
  let assignmentId=0;
  const path = window.location.pathname;  // /gradebook/123
  const s = /\d+$/.exec(path)[0];
  //console.log("assignmentId="+s);
  assignmentId=s;
  useEffect(() => {
    // called once after intial render
    fetchAssignment();
    //console.log(factors.assId);
   }, [] )


   const fetchAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            setFactors({
                assName: data.assignmentName,
                assId: data.id,
                classId: data.courseId,
                assDueDate: data.dueDate,
                courseName: data.courseTitle
            });
        })
        .catch(err => console.error(err));
};

  const editAssignment = ( ) => {
    setMessage('');


    console.log("Assignment.save ");  
    factors.name=   
    fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
        {  
          method: 'PUT', 
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
        <h3>Edit Assignment</h3>
        <h4 id="amessage" >{message}&nbsp;</h4>
        <h5>Assignment Name</h5>
        <input name="assName" value={(factors.assName)} type="text" onChange={(e) => handleChange(e)}/>
        <hr/> <h5>Assignment Id</h5>
        <input name='assId' value={(factors.assId)} type="number" readOnly/>
        <hr/><h5>Due Date</h5>
        <input name='assDueDate' value={(factors.assDueDate)} type='text' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Course Title</h5>
        <input name='courseName' value={(factors.courseName)} type='text' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Course Id</h5>
        <input name='classId' value={(factors.classId)} type="number" onChange={(e) => handleChange(e)}/> <hr></hr>
        <button id='sassign' type="button" margin="auto" onClick={editAssignment}>Save Assignment</button> <br></br>
        <button><Link to={`/`}>Back</Link></button>
      </div>
  ); 
}

export default EditAssignment;