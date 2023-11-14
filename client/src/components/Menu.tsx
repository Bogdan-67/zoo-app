import React from 'react';
import { Button, Flex } from 'antd';
import { Status } from '../models/Status.enum';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  SelectAllocationStatus,
  generateAllocation,
  saveAllocation,
} from '../redux/slices/allocationSlice';
import CreateAnimalModal from './Modals/CreateAnimalModal';

const Menu = () => {
  const status = useAppSelector(SelectAllocationStatus);
  const dispatch = useAppDispatch();
  return (
    <Flex vertical gap={10} className='mt20'>
      <CreateAnimalModal />
      <Button loading={status === Status.LOADING} onClick={() => dispatch(generateAllocation())}>
        Сгенерировать
      </Button>
      <Button
        type='primary'
        loading={status === Status.LOADING}
        onClick={() => dispatch(saveAllocation())}>
        Сохранить
      </Button>
    </Flex>
  );
};

export default Menu;
