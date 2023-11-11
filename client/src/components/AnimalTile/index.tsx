import React from 'react';
import { IAnimal } from '../../models/IAnimal';
import styles from './AnimalTile.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

type Props = {
  animal: IAnimal;
  deleteFunc?: () => void;
};

const AnimalTile = ({ animal, deleteFunc }: Props) => {
  return (
    <Tooltip title='Перетащите в вольер' placement='left'>
      <div className={styles.tile}>
        <p className={styles.tile__title}>{animal.name}</p>
        <Tooltip title={'Удалить животное'} placement='bottom'>
          {deleteFunc && <CloseOutlined className={styles.tile__delete} onClick={deleteFunc} />}
        </Tooltip>
      </div>
    </Tooltip>
  );
};

export default AnimalTile;
