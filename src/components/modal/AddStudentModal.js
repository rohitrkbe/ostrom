import { useState, useEffect } from "react";
import "./style.css";
import { Modal, Button, Table } from "react-bootstrap";
import BaseInput from "../inputField/BaseInput";

function AddStudentModal(props) {
  const [fn, setFN] = useState(null);
  const [ln, setLN] = useState(null);
  const [dob, setDOB] = useState(null);
  const [course, setCourse] = useState(null);
  const [hour, setHour] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    console.log('props', props);
    if (props.editStudent && props.editStudent !== null) {
      setFN(props.editStudent.first_name);
      setLN(props.editStudent.last_name);
      setDOB(props.editStudent.dob);
      setCourse(props.editStudent.course);
      setHour(props.editStudent.hours);
      setPrice(props.editStudent.price);
    }else{
      setFN(null);
      setLN(null);
      setDOB(null);
      setCourse(null);
      setHour(null);
      setPrice(null);
    }
  }, [props.editStudent]);

  const handleSaveClick = () => {
    if (!fn || !ln || !dob || !course || !hour || !price) {
      alert("Enter all details");
    } else {
      let studentTempData = {
        first_name: fn,
        last_name: ln,
        dob: dob,
        course: course,
        hours: hour,
        price: price,
      };
      console.log("student Data", studentTempData);
      props.onHide(studentTempData);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive="sm" borderless>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Course</th>
              <th>Hours</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <BaseInput
                  type="text"
                  placeholder="First Name"
                  value={fn}
                  inputValue={(text) => setFN(text)}
                />
              </td>
              <td>
                <BaseInput
                  type="text"
                  placeholder="Last Name"
                  value={ln}
                  inputValue={(text) => setLN(text)}
                />
              </td>
              <td>
                <BaseInput
                  type="text"
                  placeholder="DD.MM.YYYY"
                  value={dob}
                  inputValue={(text) => setDOB(text)}
                />
              </td>
              <td>
                <BaseInput
                  type="text"
                  placeholder="Course"
                  value={course}
                  inputValue={(text) => setCourse(text)}
                />
              </td>
              <td>
                <BaseInput
                  type="number"
                  placeholder="Hour"
                  value={hour}
                  inputValue={(value) => setHour(value)}
                />
              </td>
              <td>
                <BaseInput
                  type="text"
                  placeholder="0,000.00"
                  value={price}
                  inputValue={(text) => setPrice(text)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="addStudentFooter">
        <Button onClick={() => handleSaveClick()} variant="info">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddStudentModal;
