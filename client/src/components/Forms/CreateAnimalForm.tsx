import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { SubmitHandler, useForm, Controller, UseFormProps } from 'react-hook-form';
import { Button, Checkbox, Flex, Input, message } from 'antd';
import { IAnimal } from '../../models/IAnimal';
import AnimalSchema from '../../models/validation/AnimalSchema';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  title?: string;
  showOkBtn?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const CreateAnimalForm = forwardRef(
  ({ title, showOkBtn = true, onSuccess, onError }: Props, ref) => {
    const {
      handleSubmit,
      reset,
      control,
      formState: { errors },
    } = useForm<IAnimal>({
      defaultValues: {
        name: '',
        predator: false,
      },
      resolver: yupResolver(AnimalSchema),
    } as UseFormProps<IAnimal>);
    const [isSending, setIsSending] = useState<boolean>(false);

    const submitForm = () => {
      handleSubmit(submit)();
    };

    useImperativeHandle(ref, () => ({
      submitForm,
    }));

    const submit: SubmitHandler<IAnimal> = async (data) => {
      console.log(data);
      reset();
      setIsSending(true);
      if (onSuccess) {
        onSuccess();
      }
      if (onError) {
        onError('Error');
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        {title && <h2>{title}</h2>}
        <Flex vertical gap={'small'} style={{ padding: '15px 0' }}>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <>
                <Input
                  placeholder='Название животного'
                  status={errors.name ? 'error' : ''}
                  {...field}
                />
                {errors.name && <div>{errors.name.message}</div>}
              </>
            )}
          />
          <Controller
            name='predator'
            control={control}
            render={({ field }) => (
              <>
                <Checkbox value={field.value} onChange={field.onChange}>
                  Хищник
                </Checkbox>
                {errors.predator && <div>{errors.predator.message}</div>}
              </>
            )}
          />
        </Flex>
        {showOkBtn && (
          <Button
            loading={isSending}
            type='primary'
            htmlType='submit'
            style={{ marginTop: '15px' }}>
            Создать
          </Button>
        )}
      </form>
    );
  },
);

export default CreateAnimalForm;
