import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import ShimmerPage from "./ShimmerPage";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [hotelData, setHotelData] = useState();
  const [Name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();

  const [assignProp, setAssignProp] = useState();
  const navigate = useNavigate();

  async function handleRegistration(ev) {
    ev.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      alert("The email format is wrong!");
      return;
    }
    if (contact.length > 10) {
      alert("Invalid contact number length!");
      return;
    }

    await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins`, {
      method: "POST",
      body: JSON.stringify({
        Name,
        email,
        contact,
        assignedProperties: assignProp,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        setName("");
        setEmail("");
        setContact("");
        navigate("/");
      }
    });
  }

  useEffect(() => {
    async function hotelPropertyDataFetch() {
      await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/properties/unadmin`).then(
        (response) => {
          if (response.ok) {
            response.json().then((data) => {
              setHotelData(data.properties_data);
            });
          }
        }
      );
    }
    hotelPropertyDataFetch();
  }, []);

  if (!hotelData) {
    return <ShimmerPage />;
  }

  const hotelOptions = hotelData.map((hotel) => hotel.name);

  return (
    <div className="regis-page">
      <form className="regisForm" onSubmit={handleRegistration}>
        <center>
          <h1>Register Admin</h1>
        </center>
        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
          inputMode="numeric"
          pattern="[0-9]+"
          required
        />
        <Multiselect
          options={hotelOptions}
          isObject={false}
          onSelect={(e) => {
            setAssignProp(e);
          }}
          onRemove={(e) => {
            setAssignProp(e);
          }}
        />
        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
