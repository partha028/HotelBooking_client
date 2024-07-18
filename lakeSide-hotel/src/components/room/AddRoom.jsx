import React, { useState } from 'react'

const AddRoom = () => {
  const[newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const[imagePreview, setImagePreview] = useState("");
  const[successMessage, setSuccessMessage] = useState("");
  const[errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === "roomPrice"){
      if(!NaN(value))
        value.parseInt(value);
      else
        value = ""
    }
    setNewRoom({...newRoom,[name] : value}) 
  }

  // const handleImageChange = ()

  return (
    <div>AddRoom</div>
  )
}

export default AddRoom