import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
  console.log('isFormValid from booking summary', isFormValid);
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate, "days");
    const[isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const[isProcessingPayment, setIsProcessingPayment] = useState(false); 
    const navigate = useNavigate();

    const handleConfirmBooking =() =>{
      console.log('inside the handle confirm booking before timeout');
      setIsProcessingPayment(true);
      setTimeout(() => {
        console.log('inside the handle confirm booking timeout');
        setIsProcessingPayment(false);
        setIsBookingConfirmed(true);
        onConfirm()
      },3000)
    }

    useEffect(() => {
      if(isBookingConfirmed){
        navigate('/booking-success');
      }
    },[isBookingConfirmed, navigate])

  return (
    <div className='card card-body mt-5'>
      <h4>Reservation Summary</h4>
      <p>FullName : <strong>{booking.guestName}</strong></p>
      <p>Email : <strong>{booking.guestEmail}</strong></p>
      <p>Check-In Date : <strong>{moment(booking.checkInDate).format('MMM Do YYYY')}</strong></p>
      <p>Check-Out Date : <strong>{moment(booking.checkOutDate).format('MMM Do YYYY')}</strong></p>
      <p>Number of Days : <strong>{numOfDays}</strong></p>
      <div>
        <h5>Number of Guests</h5>
        <strong>Adult{booking.numberOfAdults > 1 ? 's':''} : {booking.numberOfAdults}</strong>
      </div>
      <div>
        <h5>Number of Guests</h5> 
        <strong>Children : {booking.numberOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total Payment: <strong>{payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant='success' onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span 
                  className='spinner-border spinner-border-sm mr-2 '
                  role='status'
                  aria-hidden = 'true'></span>
                  Booking Confirmed, redirecting to payment....
                </>
              ): (
                'Confirm booking and proceed to payments'
              )}
            </Button>
          ): isBookingConfirmed ? (
            <div className='d-flex justify-content-center align-items-center'>
              <div className='spinner-border text-primary' role='status'>
                <span className='sr-only'>Loading</span>
              </div>
            </div>
          ): null}
        </>
      ):(<p className='text-danger'> Check-Out date must be after Check-In date. </p>)}
    </div>
  )
}

export default BookingSummary