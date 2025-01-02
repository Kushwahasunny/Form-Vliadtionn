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
