import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function ContactDetails({ contactData, setContactData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4">
      <h4>Contact Details</h4>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmEmail">
              <Form.Label>Confirm Email</Form.Label>
              <Form.Control
                type="email"
                name="confirmEmail"
                value={contactData.confirmEmail}
                onChange={handleChange}
                isInvalid={!!errors.confirmEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmEmail}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="countryCode">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                name="countryCode"
                value={contactData.countryCode}
                onChange={handleChange}
                isInvalid={!!errors.countryCode}
              />
              <Form.Control.Feedback type="invalid">{errors.countryCode}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={contactData.phoneNumber}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ContactDetails;
