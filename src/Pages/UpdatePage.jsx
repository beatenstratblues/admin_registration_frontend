import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useParams } from "react-router-dom";
import ShimmerPage from "./ShimmerPage";
import { useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const [adminData, setAdminData] = useState();
  const [hotelData, setHotelData] = useState();
  const { id } = useParams();
  const [Name, setName] = useState("Jatin Singh");
  const [email, setEmail] = useState("singh.jatin609@gmail.com");
  const [contact, setContact] = useState("9871221870");
  const [updatedProperties, setUpdatedProperties] = useState([]);
  const navigate = useNavigate();

  async function handleUpdate(ev) {
    ev.preventDefault();
    await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins/${id}`, {
      method: "PUT",
      body: JSON.stringify({uuid:id, Name, email, contact, updatedProperties }),
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
    async function adminFetch() {
      await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins?uuid=${id}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAdminData(data);
            setName(data.admin_data[0].Name);
            setEmail(data.admin_data[0].email);
            setContact(data.admin_data[0].contact);
            setAdminData(data.admin_data[0]);
          });
        }
      });
    }
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
    adminFetch();
  }, []);

  if (!adminData) {
    return <ShimmerPage />;
  }

  const allocatedProperties = adminData.properties.map((x) => x.name);
  let hotelOptions = [];

  if (hotelData) {
    hotelOptions = hotelData.map((hotel) => hotel.name);
  }

  return (
    <div className="regis-page">
      <form className="regisForm" onSubmit={handleUpdate}>
        <center>
          <h1>Update Admin Data</h1>
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
          type="tel"
          placeholder="Contact"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
          required
        />
        <Multiselect
          selectedValues={allocatedProperties}
          isObject={false}
          options={hotelOptions}
          onSelect={(e) => {
            setUpdatedProperties(e);
          }}
          onRemove={(e) => {
            setUpdatedProperties(e);
          }}
        />
        <button type="submit">Update Admin Data</button>
      </form>
    </div>
  );
};

export default UpdatePage;
