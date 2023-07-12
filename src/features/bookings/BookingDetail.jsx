import styled from "styled-components";

import BookingDataBox from "src/features/bookings/BookingDataBox.jsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "src/ui/Tag.jsx";
import ButtonGroup from "src/ui/ButtonGroup.jsx";
import Button from "src/ui/Button.jsx";
import ButtonText from "src/ui/ButtonText.jsx";

import { useMoveBack } from "src/hooks/useMoveBack.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const booking = {};
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
