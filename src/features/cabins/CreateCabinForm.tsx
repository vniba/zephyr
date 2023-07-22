import Input from '../../ui/Input';
import Form from '../../ui/Form.tsx';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Textarea from '../../ui/Textarea.tsx';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow.tsx';
import { Cabin } from '../../services/apiCabin.ts';
import { Cabins } from '../../../types/supabase.ts';
import { useCreateCabin } from './useCreateCabin.ts';
import { useEditCabin } from './useEditCabin.ts';

export interface NewCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
}

interface CreateCabinFormProps {
  cabinToEdit?: Cabins;
  onCloseModal?: () => void;
}
const defaultCabin: Cabin = {
  discount: 0,
  regularPrice: 0,
  maxCapacity: 0,
  name: '',
  image: '',
  description: '',
};
function CreateCabinForm({
  cabinToEdit = defaultCabin,
  onCloseModal,
}: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = !!editId;
  console.log(isEditSession);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCabin>({
    defaultValues: isEditSession ? editValues : defaultCabin,
  });
  const { isCreating, createCabins } = useCreateCabin();

  const { isEditing, updateCabins } = useEditCabin();
  const isWorking = isEditing || isCreating;
  const handleAdd = (data: NewCabin) => {
    if (isEditSession)
      updateCabins(
        {
          cabin: {
            ...data,
            image: typeof data.image === 'string' ? data.image : data.image[0],
          },
          id: editId,
        },
        { onSuccess: () => reset() },
      );
    else
      createCabins(
        {
          ...data,
          image: typeof data.image !== 'string' ? data.image[0] : data.image,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  };

  return (
    <Form
      type={onCloseModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(handleAdd)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'discount required',
            validate: (value, formValues) =>
              +value < +formValues.regularPrice ||
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
          disabled={isWorking}
          {...register('description', {
            required: 'description required',
            minLength: {
              value: 10,
              message: 'Minimum length should be at least 10.',
            },
            maxLength: { value: 500, message: 'Value should not exceed 500.' },
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isWorking}
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'image required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            onClick={() => onCloseModal?.()}
            variation='secondary'
            type='reset'>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit cabin' : 'create Cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
