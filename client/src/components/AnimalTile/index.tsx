import React from 'react';
import { IAnimal } from '../../models/IAnimal';
import styles from './AnimalTile.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FaCircle } from 'react-icons/fa';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/redux';
import { clearDragItem, setDragItem } from '../../redux/slices/dragSlice';

type Props = {
  animal: IAnimal;
  tip?: string;
  disabled?: boolean;
  deleteFunc?: () => void;
};

const AnimalTile = ({ animal, disabled = false, tip = '', deleteFunc }: Props) => {
  const dispatch = useAppDispatch();

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) dispatch(setDragItem(animal));
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(clearDragItem());
  };

  return (
    <div draggable={!disabled} onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
      <Tooltip title={tip} placement='left'>
        <div className={classNames(styles.tile, { [styles.disabled]: disabled })}>
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
    </div>
  );
};

export default AnimalTile;
