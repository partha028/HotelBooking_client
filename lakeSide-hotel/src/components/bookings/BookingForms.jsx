import React, { useState, useEffect } from 'react';
import { getRoomById, bookRoom } from '../utils/ApiFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BookingSummary from './BookingSummary';
import { Form, FormControl } from 'react-bootstrap';

const BookingForms = () => {
  const [isValidated, setIsvalidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErroMessage] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfAdults: '',
    numberOfChildren: '',
  }); 
  const[roomInfo, setRoomInfo] = useState({
    photo: '',
    roomType: '',
    roomPrice: ''
  });

  const{roomId} = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const{name, value} = e.target;
    setBooking({...booking, [name]: value});
    setErroMessage("");
  }

  const getRoomPriceById = async(roomId) =>{
    try{
        const response = await getRoomById(roomId);
        setRoomPrice(response.roomPrice);
    }catch(e){
        throw new Error(e);
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId)
  },[roomId]);

  const calculatePayment = () =>{
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const pricePerDay = roomPrice ? roomPrice : 0;
    return diffInDays * pricePerDay;
  }

  const isGuestCountValid = () =>{
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >=1 && adultCount >= 1;
  }

  const isCheckOutDateValid = () => {
    if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
      setErroMessage('Check-out date should come after check-in date');
      return false;
    }else{
      setErroMessage('');
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()){
      e.stopPropagation();
    }else{
      setIsSubmitted(true);
    }
  }

  const handleBooking = async() =>{
    try{
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate('/',{state: {message: confirmationCode}});
    }
    catch(error){
      setErroMessage(error.errorMessage);
      navigate('/',{state: {message: errorMessage}});
    }
  }

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <Form.Group>
                  <Form.Label htmlFor="guestName">Full Name: </Form.Label>
                  <FormControl
                    required
                    type="text"
                    name="guestName"
                    id="guestName"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail">Email: </Form.Label>
                  <FormControl
                    required
                    type="email"
                    name="guestEmail"
                    id="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px solid #ddd", padding: "10px", marginBottom: "15px" }}>
                  <legend>Lodging Period</legend>
                  <div className="row">
                    <div className="col-6">                    
                        <Form.Label htmlFor="checkInDate">Check-In Date: </Form.Label>
                        <FormControl
                          required
                          type="date"
                          id="checkInDate"
                          name="checkInDate"
                          value={booking.checkInDate}
                          placeholder="Check-In Date"
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please select a check-in date.
                        </Form.Control.Feedback>
                    </div>

                    <div className="col-6">                    
                        <Form.Label htmlFor="checkOutDate">Check-Out Date: </Form.Label>
                        <FormControl
                          required
                          type="date"
                          id="checkOutDate"
                          name="checkOutDate"
                          value={booking.checkOutDate}
                          placeholder="Check-Out Date"
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please select a check-out date.
                        </Form.Control.Feedback>
                    </div>
                    {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                  </div>
                </fieldset>
                
                <fieldset style={{ border: "2px solid #ddd", padding: "10px" }}>
                  <legend>Number of Guests</legend>
                  <div className="row">
                    <div className="col-6">                    
                        <Form.Label htmlFor="numberOfAdults">Adults: </Form.Label>
                        <FormControl
                          required
                          type="number"
                          id="numberOfAdults"
                          name="numberOfAdults"
                          value={booking.numberOfAdults}
                          placeholder="0"
                          min={1}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please select at least 1 adult.
                        </Form.Control.Feedback>
                    </div>

                    <div className="col-6">                    
                        <Form.Label htmlFor="numberOfChildren">Children: </Form.Label>
                        <FormControl
                          required
                          type="number"
                          id="numberOfChildren"
                          name="numberOfChildren"
                          value={booking.numberOfChildren}
                          placeholder="0"
                          onChange={handleInputChange}
                        />
                    </div>
                  </div>
                </fieldset>

                <div className='form-group mt-2 mb-2'> 
                  <button className='btn btn-hotel' type='submit'>Continue</button>
                </div>
              </Form>
            </div>
          </div>
          <div className='col-md-6'>
            {isSubmitted && (
              <BookingSummary
              booking={booking}
              payment={calculatePayment}
              isFormValid={isValidated}
              onConfirm={handleBooking}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingForms;
