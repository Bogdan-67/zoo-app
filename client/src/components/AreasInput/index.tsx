import { Button, Flex, Input, Modal } from 'antd';
import React, { useId } from 'react';
import styles from './AreasInput.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SelectAreasNumber, clearAreas, setAreas } from '../../redux/slices/allocationSlice';

const { confirm } = Modal;

type Props = {};

const AreasInput = (props: Props) => {
  const inputId = useId();
  const dispatch = useAppDispatch();
  const length = useAppSelector(SelectAreasNumber);

  const handleChange = (value: number) => {
    dispatch(setAreas(value));
  };

  const handleDelete = () => {
    confirm({
      title: 'Вы точно хотите удалить все вольеры?',
      content: (
        <div>
          <b>Внимание:</b> Данное действие будет невозможно отменить.
        </div>
      ),
      onOk() {
        dispatch(clearAreas());
      },
      okText: 'Да',
      onCancel() {},
      cancelText: 'Нет',
    });
  };

  return (
    <label className={styles.box} htmlFor={inputId}>
      <p>Количество вольеров:</p>
      <Flex gap={10}>
        <Input
          id={inputId}
          type='number'
          defaultValue={0}
          min={0}
          value={length}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        <Button type='primary' onClick={handleDelete}>
          Удалить все
        </Button>
      </Flex>
    </label>
  );
};

export default AreasInput;
