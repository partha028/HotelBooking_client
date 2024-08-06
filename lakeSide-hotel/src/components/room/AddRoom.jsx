import React, { useState, Fragment } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


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
    let value = e.target.value;
    if(name === "roomPrice"){
      if(!isNaN(value))
        parseInt(value);
      else
        value = "";
    }  
    setNewRoom({...newRoom,[name] :value});
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({...newRoom, photo: selectedImage});
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const success = await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)
      if(success !== undefined){
        setSuccessMessage("A new room was added to the database");
        setNewRoom({photo: null,roomType: "",roomPrice: ""});
        setImagePreview("");
        setErrorMessage("");
      }
      else{
        setErrorMessage(error.message);
      }
    }
    catch(e){
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    },3000)
  }

  return (
    <Fragment>
      <section className='container, mt-5 mb-5'>
        <div className='row justify-content-centere'>
          <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-2'>Add a New Room</h2>
            {successMessage && (<div className='alert alert-success fade show'>{successMessage}</div>)}
            {errorMessage && (<div className='alert alert-danger fade show'>{errorMessage}</div>)}
            <form onSubmit={handleSubmit} action="">
              <div className='mb-3'>
                <label htmlFor="roomType" className='form-label'>Room Type</label>
                <div>
                  <RoomTypeSelector handleRoomInputChange= {handleRoomInputChange} newRoom= {newRoom}/>
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor="roomPrice" className='form-label'>Room Price</label>
                <input 
                  type="number"
                  className='form-control' 
                  required id='roomPrice' 
                  name='roomPrice'
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="photo" className='form-label'>Room Photo</label>
                <input 
                  type="file"
                  id='photo'
                  name='photo'
                  className='form-control'
                  onChange={handleImageChange}
                 />
                 {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview Room Photo" 
                    style={{maxWidth: "400px", maxHeight: "400px"}}
                    className='mb-3'
                  />
                 )}
              </div>
              <div className='d-grid d-flex mt-2'>
                <Link to={"/existing-rooms"} className="btn btn-outline-info">Back</Link>
                <button className='btn-outline-primry mi-5'>
                    Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AddRoom