import React from 'react'
import ShimmerPage from './ShimmerPage';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyViewElement from '../components/PropertyViewElement';

const PropertyViewPage = () => {
  const [adminPropData, setAdminPropData] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    async function adminFetch() {
      await fetch(`http://${import.meta.env.VITE_BACKEND_BASE_URL}/api/admins?uuid=${id}`).then(res=>{
        if(res.ok) {
          res.json().then(data=>{
            setAdminPropData(data.admin_data[0].properties);
          });
        }
      });
    }
    adminFetch();
  },[]);

  if(!adminPropData) {
    return <ShimmerPage/>
  }

  return (
    <div className='propViewPage'>
      <div className='propViewCont'>
        {
          adminPropData.map((x)=>{
            return <PropertyViewElement property={x} key={x.prop_id}/>
          })
        }
      </div>
    </div>
  )
}

export default PropertyViewPage