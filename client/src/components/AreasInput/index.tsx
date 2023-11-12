import { Input } from 'antd';
import React, { useId } from 'react';
import styles from './AreasInput.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SelectAreasNumber, setAreas } from '../../redux/slices/allocationSlice';

type Props = {};

const AreasInput = (props: Props) => {
  const inputId = useId();
  const dispatch = useAppDispatch();
  const length = useAppSelector(SelectAreasNumber);

  const handleChange = (value: number) => {
    dispatch(setAreas(value));
  };

  return (
    <label className={styles.box} htmlFor={inputId}>
      <p>Количество вольеров:</p>
      <Input
        id={inputId}
        type='number'
        defaultValue={0}
        min={0}
        value={length}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
    </label>
  );
};

export default AreasInput;
