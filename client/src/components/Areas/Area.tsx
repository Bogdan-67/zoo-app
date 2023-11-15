import React, { FC, useState } from 'react';
import { IArea } from '../../models/IArea';
import AnimalTile from '../AnimalTile';
import classNames from 'classnames';
import styles from './Area.module.scss';
import { Card, Flex, Skeleton, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addAnimalInArea, removeAnimalFromArea } from '../../redux/slices/allocationSlice';
import { SelectDragItem, clearDragItem } from '../../redux/slices/dragSlice';
import { IAnimal } from '../../models/IAnimal';
import { AiFillWarning } from 'react-icons/ai';
import { ExclamationCircleFilled } from '@ant-design/icons';

type Props = {
  area: IArea;
  nomer?: number;
};

const Area: FC<Props> = ({ area, nomer }) => {
  const dragItem = useAppSelector(SelectDragItem);
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [warn, setWarn] = useState<string | null>(null);

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.relatedTarget as HTMLElement;
    if (!target || !e.currentTarget.contains(target)) {
      setIsDragging(false);
      setWarn(null);
    }
  };

  const getPredator = (value: boolean) => {
    return value ? 'хищник' : 'не хищник';
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragItem && dragItem?.type === 'animal') {
      if (area.first && area.second) setWarn('Вольер заполнен');
      else if (
        (area.first || area.second) &&
        (area.first || area.second)?.predator !== dragItem.predator
      )
        setWarn(
          `${getPredator(dragItem.predator)} не может находиться вместе с ${getPredator(
            (area.first || area.second)?.predator || false,
          )}ом`,
        );
      else setIsDragging(true);
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setWarn(null);
    dispatch(clearDragItem());
    if (
      dragItem?.type === 'animal' &&
      !(area.first && area.second) &&
      ((area.first === null && area.second === null) ||
        (area.first || area.second)?.predator === dragItem.predator)
    ) {
      dispatch(addAnimalInArea({ animal: dragItem as IAnimal, id: area.id }));
    }
  };

  return (
    <div onDragOver={dragOverHandler} onDrop={dropHandler} onDragLeave={(e) => dragEndHandler(e)}>
      <Tooltip
        title={
          warn ? (
            <span className={styles.warn}>
              <ExclamationCircleFilled className={styles.warn__icon} /> {warn}
            </span>
          ) : (
            ''
          )
        }
        open={!!warn}>
        <Card
          size='small'
          title={`Вольер${nomer ? ` №${nomer}` : ''}`}
          className={classNames('container', styles.area)}>
          <Flex vertical gap={10}>
            {area.first ? (
              <AnimalTile
                animal={area.first}
                deleteFunc={() => dispatch(removeAnimalFromArea({ animal: 'first', id: area.id }))}
              />
            ) : (
              isDragging && <Skeleton.Input size={'default'} />
            )}
            {area.second ? (
              <AnimalTile
                animal={area.second}
                deleteFunc={() => dispatch(removeAnimalFromArea({ animal: 'second', id: area.id }))}
              />
            ) : (
              isDragging && area.first && <Skeleton.Input size={'default'} />
            )}
          </Flex>
        </Card>
      </Tooltip>
    </div>
  );
};

export default Area;
