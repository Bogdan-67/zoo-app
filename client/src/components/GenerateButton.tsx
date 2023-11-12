import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { SelectAllocationStatus, generateAllocation } from '../redux/slices/allocationSlice';
import { Button } from 'antd';
import { Status } from '../models/Status.enum';

type Props = {};

const GenerateButton = (props: Props) => {
  const status = useAppSelector(SelectAllocationStatus);
  const dispatch = useAppDispatch();
  return (
    <Button loading={status === Status.LOADING} onClick={() => dispatch(generateAllocation())}>
      Сгенерировать
    </Button>
  );
};

export default GenerateButton;
