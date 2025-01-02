import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Passenger({ user, index, userData, setUserData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = [...userData];
    updatedData[index][name] = value;
    setUserData(updatedData);
  };

  const handleDateChange = (name, value) => {
    const updatedData = [...userData];
    updatedData[index][name] = value;

    if (name === "dateOfBirth" && updatedData[index].dateOfIssue) {
      if (new Date(value) >= new Date(updatedData[index].dateOfIssue)) {
        updatedData[index].dateOfIssue = "";
      }
    }

    if (name === "dateOfIssue" && updatedData[index].expiryDate) {
      if (new Date(value) >= new Date(updatedData[index].expiryDate)) {
        updatedData[index].expiryDate = "";
      }
    }

    setUserData(updatedData);
  };

  const getMinDateOfBirth = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 60);
    return today.toISOString().split("T")[0];
  };

  const getMaxDateOfBirth = () => new Date().toISOString().split("T")[0];

  const getMinDateOfIssue = () => (user.dateOfBirth ? user.dateOfBirth : null);

  const getMaxDateOfIssue = () => new Date().toISOString().split("T")[0];

  const getMinExpiryDate = () => new Date().toISOString().split("T")[0];

  const getMaxExpiryDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 25);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="mb-4">
      <h4>Passenger {index + 1}</h4>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId={`firstName-${index}`}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId={`lastName-${index}`}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId={`gender-${index}`}>
              <Form.Label>Gender</Form.Label>
              <div>
                <Button
                  variant={user.gender === "Male" ? "primary" : "outline-primary"}
                  onClick={() => handleChange({ target: { name: "gender", value: "Male" } })}
                >
                  Male
                </Button>
                <Button
                  variant={user.gender === "Female" ? "primary" : "outline-primary"}
                  onClick={() => handleChange({ target: { name: "gender", value: "Female" } })}
                  className="ms-2"
                >
                  Female
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId={`dateOfBirth-${index}`}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                max={getMaxDateOfBirth()}
                min={getMinDateOfBirth()}
                value={user.dateOfBirth}
                onChange={(e) => handleDateChange("dateOfBirth", e.target.value)}
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId={`dateOfIssue-${index}`}>
              <Form.Label>Date of Issue</Form.Label>
              <Form.Control
                type="date"
                name="dateOfIssue"
                min={getMinDateOfIssue()}
                max={getMaxDateOfIssue()}
                value={user.dateOfIssue}
                onChange={(e) => handleDateChange("dateOfIssue", e.target.value)}
                isInvalid={!!errors.dateOfIssue}
              />
              <Form.Control.Feedback type="invalid">{errors.dateOfIssue}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId={`expiryDate-${index}`}>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                min={getMinExpiryDate()}
                max={getMaxExpiryDate()}
                value={user.expiryDate}
                onChange={(e) => handleDateChange("expiryDate", e.target.value)}
                isInvalid={!!errors.expiryDate}
              />
              <Form.Control.Feedback type="invalid">{errors.expiryDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId={`nationality-${index}`}>
              <Form.Label>Nationality</Form.Label>
              <Form.Select
                name="nationality"
                value={user.nationality}
                onChange={handleChange}
                isInvalid={!!errors.nationality}
              >
                <option value="">Select Nationality</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId={`issueCountry-${index}`}>
              <Form.Label>Issue Country</Form.Label>
              <Form.Select
                name="issueCountry"
                value={user.issueCountry}
                onChange={handleChange}
                isInvalid={!!errors.issueCountry}
              >
                <option value="">Select Issue Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.issueCountry}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Passenger;
