import React, { useEffect } from 'react';
import { SelectAnimals, fetchAnimals } from '../../redux/slices/animalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';
import LoadingSpinner from '../LoadingSpinner';
import { Empty } from 'antd';
import AnimalTile from '../AnimalTile';
import styles from './AnimalsList.module.scss';
import classNames from 'classnames';

type Props = {};

const AnimalsList = (props: Props) => {
  const { list: animals, status, error } = useAppSelector(SelectAnimals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnimals());
  }, []);

  return (
    <div className={classNames('container', styles.wrapper)}>
      {status === Status.LOADING ? (
        <LoadingSpinner />
      ) : status === Status.ERROR ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error} />
      ) : (
        <>
          {animals.map((animal) => (
            <AnimalTile
              key={animal.id}
              animal={animal}
              tip='Добавить в вольер'
              deleteFunc={() => {}}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AnimalsList;
