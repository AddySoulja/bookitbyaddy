//@ desc : utility function for modifying necessary seats in a coach
//@ props: { bookedSeats: number of seats booked till now, lastBooking: last booking details}
//@ returns: Array of Objects containing information of particular seats such as seat number, isBooked & lastBooked

export const populateCoach = (bookedSeats, lastBooking) => {
  let coach = [];
  let isBooked = false;
  let lastBooked = false;
  for (let i = 0; i < 80; i++) {
    if (80 - bookedSeats === 0) isBooked = true;
    if (i + 1 <= bookedSeats) isBooked = true;
    if (i + 1 > bookedSeats - lastBooking && i + 1 <= bookedSeats)
      lastBooked = true;

    coach.push({
      num: i + 1,
      isBooked,
      lastBooked,
    });
    isBooked = false;
    lastBooked = false;
  }
  return coach;
};
