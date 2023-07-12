import styled from "styled-components";
import BookingDataBox from "src/features/bookings/BookingDataBox.jsx";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "src/ui/ButtonGroup.jsx";
import Button from "src/ui/Button.jsx";
import ButtonText from "src/ui/ButtonText.jsx";

import { useMoveBack } from "src/hooks/useMoveBack.ts";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const booking = {};

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {}

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
