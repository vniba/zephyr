import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings.js';
import Spinner from '../../ui/Spinner.tsx';
import toast from 'react-hot-toast';
const defaultValue = {
  breakfastPrice: 0,
  maxBookingLength: 0,
  minBookingLength: 0,
  maxGuestsPerBooking: 0,
};
function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = defaultValue,
  } = useSettings();
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  if (isLoading) return <Spinner />;
  if (error) return toast.error((error as Error).message);
  return (
    <Form type='modal'>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
