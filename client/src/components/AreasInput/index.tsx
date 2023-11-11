import { Input } from 'antd';
import React, { useId } from 'react';
import styles from './AreasInput.module.scss';

type Props = {};

const AreasInput = (props: Props) => {
  const inputId = useId();
  return (
    <label className={styles.box} htmlFor={inputId}>
      <p>Количество вольеров:</p>
      <Input id={inputId} />
    </label>
  );
};

export default AreasInput;
