import React from "react";

//@ desc : Seat component
//@ props: seat Object
//@ returns: Individual stateless Seat component with definite styles

const Seat = ({ seat }) => {
  const { num, isBooked, lastBooked } = seat;
  return (
    <>
      <div
        className="seat"
        style={{
          color: isBooked && lastBooked ? "black" : "white",
          backgroundColor:
            isBooked && lastBooked ? "yellow" : isBooked ? "red" : "green",
        }}
      >
        {num}
      </div>
    </>
  );
};

export default Seat;
