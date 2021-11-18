import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import AddStudentModal from "./components/modal/AddStudentModal";

const dummyStudentData = [
  {
    first_name: "Abc",
    last_name: " abc1",
    dob: "22.06.1991",
    course: "Python",
    hours: 100,
    price: "3600.00",
  },
  {
    first_name: "DEF",
    last_name: "def1",
    dob: "12.09.1995",
    course: "JAVA",
    hours: 136,
    price: "4500.00",
  },
  {
    first_name: "XYZ",
    last_name: "xyz1",
    dob: "12.12.1991",
    course: "C++",
    hours: 100,
    price: "4000.00",
  },
];

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [studentList, setStudentList] = useState(null);
  const [addStudent, setAddStudent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);

  // updating dummy data after 2 sec of page load
  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
      setStudentList(dummyStudentData);
      setAddStudent(true)
    }, 2000);
  }, []);

  // add student in student list and change ui
  const handleAddSTudentClick = () => {
    setEditStudentData(null);
    setModalShow(true);
  };

  // add student modal save click button event
  const handelModalSaveClick = (studentData) => {
    console.log("studentData in home", studentData);
    if (studentData) {
      if (editStudentData) {
        let tempStudentsList = studentList.filter(
          (item) =>
            item.first_name !== editStudentData.first_name &&
            item.last_name !== editStudentData.last_name
        );
        tempStudentsList.push(studentData);
        setStudentList(tempStudentsList);
      } else {
        let tempStudentList = [...studentList];
        tempStudentList.push(studentData);
        setStudentList(tempStudentList);
      }
    }
    setEditStudentData(null);
    setModalShow(false);
  };

  // open modal and edit selected object
  const handleEditStudentData = (itemSelected) => {
    setEditStudentData(itemSelected);
    setModalShow(true);
  };

  // delete selected object from list
  const handleDeleteStudentData = (itemSelected) => {
    let tempStudentList = studentList.filter(
      (item) =>
        item.first_name !== itemSelected.first_name &&
        item.last_name !== itemSelected.last_name
    );
    setStudentList(tempStudentList);
  };

  const formatCurrency = (n, currency) => {
    return currency + n.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }

  return (
    <div className="marginTop1Vh">
      <AddStudentModal
        show={modalShow}
        onHide={(studentData) => handelModalSaveClick(studentData)}
        editStudent={editStudentData}
      />
      <Container fluid>
        {addStudent ? (
          <Row className="marginBottom1Vh">
            <Col>
              <Button
                className=""
                variant="info"
                onClick={() => handleAddSTudentClick()}
              >
                Add Student
              </Button>
            </Col>
          </Row>
        ) : null}
        <Row className="marginTop1Vh">
          <Col>
            {dataLoaded ? (
              <>
                <Table responsive striped  borderless  hover className="tableStyle">
                  <thead>
                    <tr>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>DATE OF BIRTH</th>
                      <th>COURSE</th>
                      <th>HOURS</th>
                      <th>PRICE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList && studentList.length > 0 ? (
                      <>
                        {studentList.map((item, index) => {
                          return (
                            <tr key={`studentList${index}`}>
                              <td>
                                {item && item.first_name
                                  ? item.first_name
                                  : "NA"}
                              </td>
                              <td>
                                {item && item.last_name ? item.last_name : "NA"}
                              </td>
                              <td>{item && item.dob ? item.dob : "NA"}</td>
                              <td>
                                {item && item.course ? item.course : "NA"}
                              </td>
                              <td>{item && item.hours ? item.hours : "NA"}H</td>
                              <td>{item && item.price ? item.price : "NA"}€</td>
                              <td>
                                <div className="tableEventColumn">
                                  <p
                                    className="tableEventButton"
                                    onClick={() => handleEditStudentData(item)}
                                  >
                                    Edit
                                  </p>
                                  &nbsp; &nbsp;
                                  <p
                                    className="tableEventButton"
                                    onClick={() =>
                                      handleDeleteStudentData(item)
                                    }
                                  >
                                    Delete
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <tr>
                        <td>no data</td>
                        <td>no data</td>
                        <td>no data</td>
                        <td>no data</td>
                        <td>no data</td>
                        <td>no data</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </>
            ) : (
              <div>
                <p>Data is being loaded</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
