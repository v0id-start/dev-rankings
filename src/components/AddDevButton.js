import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import app from '../firebase/firebase.js';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { isValidPeriodString } from '../utils/constants.js';

export default function AddDevButton() {
  const [nameToAdd, setNameToAdd] = useState("");
  const [periodToAdd, setPeriodToAdd] = useState("");
  const [pointsToAdd, setPointsToAdd] = useState("");

  const [validated, setValidated] = useState(false);

  const db = getFirestore(app);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !isValidPeriodString(periodToAdd)) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      await setDoc(doc(db, "users", nameToAdd), {
        Name: nameToAdd,
        Period: periodToAdd.split(","),
        Points: Number(pointsToAdd),
        pcoin: 0,
        pstock: 0
      }).then(setValidated(true));
      setNameToAdd("");
      setPeriodToAdd("");
      setPointsToAdd(0);
      setValidated(false);
    }

  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationName">
          <Form.Control
            required
            type="text"
            placeholder="Name"
            onChange={(e) => setNameToAdd(e.target.value)}
            value={nameToAdd}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationPeriod">
          <Form.Control
            required
            type="text"
            placeholder="Period"
            onChange={(e) => setPeriodToAdd(e.target.value)}
            value={periodToAdd}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationName">
          <Form.Control
            required
            type="number"
            placeholder="Points"
            onChange={(e) => setPointsToAdd(e.target.value)}
            value={pointsToAdd}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      

      <Button type="submit">Add Developer</Button>
    </Form>
    </div>
  );
}