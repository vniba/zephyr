import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form.tsx';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Textarea from '../../ui/Textarea.tsx';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../utils/cabinFn.ts';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import FormRow from '../../ui/FormRow.tsx';

export interface NewCabin {
  name: string;
  maxCapacity: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: string;
}

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCabin>();
  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      toast.success('cabin successfully created');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
      reset();
    },
    onError: error => toast.error((error as Error).message),
  });
  const handleAdd = (data: NewCabin) => {
    mutate(data);
  };

  return (
    <Form type='modal' onSubmit={handleSubmit(handleAdd)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isLoading}
          type='text'
          id='name'
          {...register('name', {
            required: 'name is required',
            minLength: {
              value: 3,
              message: 'Minimum length should be at least 3.',
            },
          })}
        />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isLoading}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Max capacity is required.',
            min: { value: 1, message: 'Max capacity should be at least 1.' },
            max: { value: 12, message: 'Max capacity should not exceed 12.' },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          disabled={isLoading}
          id='regularPrice'
          {...register('regularPrice', {
            required: 'price is required',
            min: { value: 50, message: 'Value should be at least 50.' },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isLoading}
          defaultValue={0}
          {...register('discount', {
            required: 'discount required',
            validate: (value, formValues) =>
              value < formValues.regularPrice ||
              'discount should be less than the regular price.',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}>
        <Textarea
          id='description'
          defaultValue=''
          disabled={isLoading}
          {...register('description', {
            required: 'description required',
            minLength: {
              value: 10,
              message: 'Minimum length should be at least 10.',
            },
            maxLength: { value: 300, message: 'Value should not exceed 80.' },
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isLoading}
          accept='image/*'
          {...register('image', { required: 'image required' })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation='secondary' type='reset'>
            Cancel
          </Button>
          <Button disabled={isLoading}>Edit cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
