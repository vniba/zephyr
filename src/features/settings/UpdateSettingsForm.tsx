import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings.js';
import Spinner from '../../ui/Spinner.tsx';
import toast from 'react-hot-toast';
import { useUpdateSettings } from './useUpdateSettings.ts';
import Button from '../../ui/Button.tsx';
import { FieldValues, useForm } from 'react-hook-form';
import { Settings } from '../../../types/supabase.ts';
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
  const { updateSetting, isUpdating } = useUpdateSettings();
  const { handleSubmit, register } = useForm();
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  const handleSub = (data: FieldValues) => {
    if (!data) return;
    updateSetting({ ...data } as Settings);
  };
  if (isLoading) return <Spinner />;
  if (error) return toast.error((error as Error).message);
  return (
    <Form type='modal' onSubmit={handleSubmit(handleSub)}>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          {...register('minBookingLength')}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          {...register('maxBookingLength')}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          {...register('maxGuestsPerBooking')}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          {...register('breakfastPrice')}
          defaultValue={breakfastPrice}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating} type='submit'>
          update
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
