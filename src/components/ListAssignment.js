import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  };


  const deleteAssignment = (id) => 
  {
    fetch(`${SERVER_URL}/assignment/${id}` ,
    {  
      method: 'DELETE'
    } )
.then(res => {
    if (res.ok) {
      //fetchGrades(assignmentId);
      setMessage("Assignment Deleted.");
      window.location.reload(false);  
    } else {
      setMessage("Save error. "+res.status);
      console.error('Delete assignment error =' + res.status);
}})
  .catch(err => {
      setMessage("Exception. "+err);
      console.error('Delete assignment exception =' + err);
  });
};        
  
const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];

    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td><Link to={`/editAssignment/${assignments[idx].id}`}>Edit</Link></td>
                      <td><button onClick={()=>deleteAssignment(assignments[idx].id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to={`/addAssignment/`}>Add Assignment</Link>
          </div>
      </div>
    )
}  

export default ListAssignment;