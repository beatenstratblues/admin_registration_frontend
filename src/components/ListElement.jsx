import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListElement = ({ elementData }) => {
  const navigate = useNavigate();

  async function handleDelete(uuid) {
    await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins/${uuid}`, {
      method: "delete",
    }).then((res) => {
      if (res.ok) {
        navigate(0);
      }
    });
  }

  return (
    <div className="ListElement">
      <div>
        <span>{elementData.Name}</span>
      </div>
      <div>
        <span>{elementData.email}</span>
      </div>
      <div>
        <span>{elementData.contact}</span>
      </div>
      <div className="buttonSection">
        <div
          className="EditButton"
          onClick={() => {
            navigate(`/update/${elementData.uuid}`);
          }}
        >
          Edit
        </div>
        <div
          className="EditButton"
          onClick={() => {
            navigate(`/property/${elementData.uuid}`);
          }}
        >
          View
        </div>
        <div
          className="EditButton"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            const a = confirm("Are you sure? Delete action cannot be undone");
            if (a) {
              handleDelete(elementData.uuid);
            }
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default ListElement;
