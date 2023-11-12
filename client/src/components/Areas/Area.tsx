import React, { FC } from 'react';
import { IArea } from '../../models/IArea';
import AnimalTile from '../AnimalTile';
import classNames from 'classnames';
import styles from './Area.module.scss';
import { Card, Flex } from 'antd';
import { useAppDispatch } from '../../hooks/redux';
import { removeAnimalFromArea } from '../../redux/slices/allocationSlice';

type Props = {
  area: IArea;
  nomer?: number;
};

const Area: FC<Props> = ({ area, nomer }) => {
  const dispatch = useAppDispatch();
  return (
    <Card
      size='small'
      title={`Вольер${nomer ? ` №${nomer}` : ''}`}
      className={classNames('container', styles.area)}>
      <Flex vertical gap={10}>
        {area.first && (
          <AnimalTile
            animal={area.first}
            deleteFunc={() => dispatch(removeAnimalFromArea({ animal: 'first', id: area.id }))}
          />
        )}
        {area.second && (
          <AnimalTile
            animal={area.second}
            deleteFunc={() => dispatch(removeAnimalFromArea({ animal: 'second', id: area.id }))}
          />
        )}
      </Flex>
    </Card>
  );
};

export default Area;
