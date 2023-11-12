import React, { FC, useState } from 'react';
import { IArea } from '../../models/IArea';
import AnimalTile from '../AnimalTile';
import classNames from 'classnames';
import styles from './Area.module.scss';
import { Card, Flex, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addAnimalInArea, removeAnimalFromArea } from '../../redux/slices/allocationSlice';
import { SelectDragItem, clearDragItem } from '../../redux/slices/dragSlice';
import { IAnimal } from '../../models/IAnimal';

type Props = {
  area: IArea;
  nomer?: number;
};

const Area: FC<Props> = ({ area, nomer }) => {
  const dragItem = useAppSelector(SelectDragItem);
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.relatedTarget as HTMLElement;
    if (!target || !e.currentTarget.contains(target)) {
      console.log('dragend');
      setIsDragging(false);
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
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
    </div>
  );
};

export default Area;
