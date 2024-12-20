import React from 'react'

const PropertyViewElement = ({property}) => {
  return (
    <div className='pvElement'>
        <div>{property.name}</div>
        <div>{property.address}</div>
    </div>
  )
}

export default PropertyViewElement