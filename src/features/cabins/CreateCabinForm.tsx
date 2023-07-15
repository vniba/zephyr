import styled from 'styled-components';
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

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
  const { register, handleSubmit, reset } = useForm<NewCabin>();
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
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input required type='text' id='name' {...register('name')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          required
          type='number'
          id='maxCapacity'
          {...register('maxCapacity')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          required
          type='number'
          id='regularPrice'
          {...register('regularPrice')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          required
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          required
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          required
          id='image'
          accept='image/*'
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
