import React, { useEffect, useRef, useState } from "react";
import Seat from "./components/Seat";
import { populateCoach } from "./utils/populateCoach";

const App = () => {
  //Total seats
  const [seats, setSeats] = useState([]);
  //Booked seats
  const [bookedSeats, setBookedSeats] = useState(0);
  //Total seats of last booking
  const [lastBooking, setLastBooking] = useState(0);
  //Error (if any)
  const [error, setError] = useState("");
  //Input ref for input and focus whenever needed
  const inputRef = useRef();

  //handler function for updating booked seats
  const handleBooking = (e) => {
    e.preventDefault();
    setError("");
    const numOfSeats = parseInt(inputRef.current.value);
    const seatsLeft = 80 - bookedSeats;

    //checks if the input is empty
    if (inputRef.current.value === "") {
      setError(`Please enter number of seats!`);
      inputRef.current.focus();
      return;
    }
    //checks if the seats are full
    if (bookedSeats === 80) {
      setError(`Sorry, No seats left!`);
      setSeats(populateCoach(bookedSeats, 0));
      inputRef.current.value = "";
      return;
    }
    //checks if the number of seats provided exceeds number of seats left
    if (numOfSeats > seatsLeft) {
      setError(`Sorry, only ${seatsLeft} seats left!`);
      inputRef.current.value = "";
      inputRef.current.focus();
      return;
    }
    //checks if the number of seats provided falls within the reservation range
    if (numOfSeats > 7 || numOfSeats < 1) {
      setError(`You can only reserve 1 up to 7 seats at a time.`);
      inputRef.current.value = "";
      inputRef.current.focus();
      return;
    }
    setLastBooking(numOfSeats);
    setBookedSeats((prev) => {
      return prev + numOfSeats;
    });
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  // side effect for populating seats
  useEffect(() => {
    const res = populateCoach(bookedSeats, lastBooking);
    setSeats(res);
  }, [bookedSeats, lastBooking]);

  return (
    <>
      <form onSubmit={handleBooking} className="form">
        <label htmlFor="input">
          Provide number of seats to book:{" "}
          <input type="number" ref={inputRef} id="input" />
        </label>
        <button type="submit">Book seats</button>
      </form>
      <div className="error">{error}</div>
      <div className="coach_container">
        <>
          {seats.map((seat) => (
            <Seat seat={seat} key={seat.num} />
          ))}
        </>
      </div>
      <div className="legend">
        <h3>LEGEND</h3>
        <div className="legend_span">
          Booked seats: <div className="booked"></div>
        </div>
        <div className="legend_span">
          Last booked seats: <div className="last_booked"></div>
        </div>
        <div className="legend_span">
          Available seats: <div className="available"></div>
        </div>
      </div>
    </>
  );
};

export default App;
