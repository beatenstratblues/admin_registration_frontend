import React, { useEffect, useState } from "react";
import ListElement from "./ListElement";
import SearchBar from "./SearchBar";
import ShimmerPage from "../Pages/ShimmerPage";

const AdminListBody = () => {
  const [adminData, setAdminData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectFilter, setSelectFilter] = useState("");

  useEffect(() => {
    async function fetchAllAdmins() {
      await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins?uuid=all`).then((res) => {
        console.log("The API CALL BEING MADE");
        res.json().then((data) => {
          setAdminData(data.admin_data);});
      });
    }

    fetchAllAdmins();
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    async function searchAdmins() {

      let searchType;
      if (selectFilter==="Name") searchType = "byName";
      else if (selectFilter==="Email") searchType = "byEmail";
      else if (selectFilter==='Contact') searchType = "byContact";

      console.log(searchType);

      const url = `http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins/search?searchType=${searchType}&searchQuery=${searchQuery}`; //change filter type to drop down

      await fetch(url)
        .then((res) => res.json())
        .then((data) => setAdminData(data.admin_Data || []));
    }

    searchAdmins();
  }, [searchQuery]);

  if (!adminData) {
    return <ShimmerPage />;
  }

  return (
    <div className="mainContent">
      <SearchBar
        queryFunction={{ searchQuery, setSearchQuery }}
        selectFilter={{selectFilter,setSelectFilter}}
      />
      <div>
        {adminData.map((ele) => {
          return <ListElement elementData={ele} key={ele.uuid} />;
        })}
      </div>
    </div>
  );
};

export default AdminListBody;
