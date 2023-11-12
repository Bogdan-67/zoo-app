import React, { FC } from 'react';
import { IArea } from '../../models/IArea';
import AnimalTile from '../AnimalTile';
import classNames from 'classnames';
import styles from './Area.module.scss';
import { Card, Flex } from 'antd';

type Props = {
  area: Partial<IArea>;
  nomer?: number;
};

const Area: FC<Props> = ({ area, nomer }) => {
  return (
    <Card
      size='small'
      title={`Вольер${nomer ? ` №${nomer}` : ''}`}
      className={classNames('container', styles.area)}>
      <Flex vertical gap={10}>
        {area.first && <AnimalTile animal={area.first} />}
        {area.second && <AnimalTile animal={area.second} />}
      </Flex>
    </Card>
  );
};

export default Area;
