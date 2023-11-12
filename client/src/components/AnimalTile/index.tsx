import React from 'react';
import { IAnimal } from '../../models/IAnimal';
import styles from './AnimalTile.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';
import { FaCircle } from 'react-icons/fa';
import classNames from 'classnames';

type Props = {
  animal: IAnimal;
  tip?: string;
  deleteFunc?: () => void;
};

const AnimalTile = ({ animal, tip = '', deleteFunc }: Props) => {
  return (
    <Tooltip title={tip} placement='left'>
      <div className={styles.tile}>
        <Tooltip title={animal.predator ? 'Хищник' : 'Не хищник'}>
          <FaCircle
            className={classNames(styles.indicator, { [styles.predator]: animal.predator })}
          />
        </Tooltip>
        <p className={styles.tile__title}>{animal.name}</p>
        {deleteFunc && (
          <Tooltip title={'Удалить животное'} placement='top'>
            <CloseOutlined className={styles.tile__delete} onClick={deleteFunc} />
          </Tooltip>
        )}
      </div>
    </Tooltip>
  );
};

export default AnimalTile;
