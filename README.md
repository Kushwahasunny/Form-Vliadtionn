import React, { useState } from "react";
import Passenger from "./Passenger";
import ContactDetails from "./ContactDetails";

function App() {
  const [numAdults, setNumAdults] = useState(4); // Default to 2 adults
  const [userData, setUserData] = useState([
    {
      id: 1,
      passengerKey: "adult1",
      firstName: "",
      lastName: "",
      gender: "Male",
      dateOfBirth: "",
      nationality: "",
      dateOfIssue: "",
      issueCountry: "",
      expiryDate: "",
    },
    {
      id: 2,
      passengerKey: "adult2",
      firstName: "",
      lastName: "",
      gender: "Male",
      dateOfBirth: "",
      nationality: "",
      dateOfIssue: "",
      issueCountry: "",
      expiryDate: "",
    },
  ]);

  const [contactData, setContactData] = useState({
    email: "",
    confirmEmail: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    passengers: [],
    contact: {},
  });

  const handleNumAdultsChange = (e) => {
    const newNumAdults = parseInt(e.target.value, 10) || 0;

    // Update userData to match the new number of adults
    const updatedUserData = Array.from({ length: newNumAdults }, (_, i) => ({
      id: i + 1,
      passengerKey: `adult${i + 1}`,
      firstName: userData[i]?.firstName || "",
      lastName: userData[i]?.lastName || "",
      gender: userData[i]?.gender || "Male",
      dateOfBirth: userData[i]?.dateOfBirth || "",
      nationality: userData[i]?.nationality || "",
      dateOfIssue: userData[i]?.dateOfIssue || "",
      issueCountry: userData[i]?.issueCountry || "",
      expiryDate: userData[i]?.expiryDate || "",
    }));

    setNumAdults(newNumAdults);
    setUserData(updatedUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passengerErrors = userData.map((user) => {
      const userErrors = {};
      if (!user.firstName) userErrors.firstName = "First name is required.";
      if (!user.lastName) userErrors.lastName = "Last name is required.";
      if (!user.dateOfBirth) userErrors.dateOfBirth = "Date of birth is required.";
      if (!user.dateOfIssue) userErrors.dateOfIssue = "Date of issue is required.";
      if (!user.expiryDate) userErrors.expiryDate = "Expiry date is required.";
      if (!user.nationality) userErrors.nationality = "Nationality is required.";
      if (!user.issueCountry) userErrors.issueCountry = "Issue country is required.";
      return userErrors;
    });

    const duplicateFirstNames = userData
      .map((user) => user.firstName)
      .filter((name, index, array) => name && array.indexOf(name) !== index);

    passengerErrors.forEach((userErrors, index) => {
      if (duplicateFirstNames.includes(userData[index].firstName)) {
        userErrors.firstName = "Duplicate first name detected.";
      }
    });

    const contactErrors = {};
    if (!contactData.email) contactErrors.email = "Email is required.";
    if (!contactData.confirmEmail) contactErrors.confirmEmail = "Confirm email is required.";
    if (contactData.email !== contactData.confirmEmail)
      contactErrors.confirmEmail = "Emails do not match.";
    if (!contactData.countryCode) contactErrors.countryCode = "Country code is required.";
    if (!contactData.phoneNumber) contactErrors.phoneNumber = "Phone number is required.";

    setErrors({ passengers: passengerErrors, contact: contactErrors });

    const isFormValid =
      passengerErrors.every((err) => Object.keys(err).length === 0) &&
      Object.keys(contactErrors).length === 0;

    if (isFormValid) {
      console.log("User Data:", userData);
      console.log("Contact Data:", contactData);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Passenger Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="numAdults" className="form-label">
            Number of Adults
          </label>
          <input
            type="number"
            id="numAdults"
            className="form-control"
            value={numAdults}
            min="1"
            onChange={handleNumAdultsChange}
          />
        </div>
        {userData.map((user, index) => (
          <Passenger
            key={user.id}
            user={user}
            index={index}
            userData={userData}
            setUserData={setUserData}
            errors={errors.passengers[index] || {}}
          />
        ))}
        <ContactDetails
          contactData={contactData}
          setContactData={setContactData}
          errors={errors.contact}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;














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
