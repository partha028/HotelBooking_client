import React, { useEffect, useState, Fragment } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes] = useState([]);
    const[showRoomTypeInput, setShowRoomTypeInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data => {
            setRoomTypes(data);
        }))
    }, [])

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowRoomTypeInput(false)
        }
    }

  return (
   <Fragment>
     {roomTypes.length >= 0 && (
        <div>
            <select 
                className='form-control'
                name="roomType" 
                id="roomType" 
                value={newRoom.roomType}
                onChange={(e) =>{
                    if(e.target.value === "Add New"){
                        setShowRoomTypeInput(true);
                    }
                    else{
                        handleRoomInputChange(e)
                    }
                }}>
                <option value={""}>Select a room type</option> 
                <option value={"Add New"}>Add new room</option>
                {roomTypes.map((roomType, index) => (
                    <option key={index} value={roomType}>{roomType}</option>
                ))}
            </select>
            {showRoomTypeInput && 
                ( <div className='input-group mt-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter a new room type'
                        onChange={handleNewRoomInputChange}
                        value={newRoomType}>                       
                    </input>
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                        Add
                    </button>
                   </div>
                )}
        </div>
     )}
   </Fragment>
  )
}

export default RoomTypeSelector