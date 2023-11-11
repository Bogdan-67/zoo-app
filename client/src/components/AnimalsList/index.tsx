import React, { useEffect } from 'react';
import { SelectAnimals, fetchAnimals } from '../../redux/slices/animalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';
import LoadingSpinner from '../LoadingSpinner';
import { Empty } from 'antd';
import styles from './AnimalsList.module.scss';
import AnimalTile from '../AnimalTile';

type Props = {};

const AnimalsList = (props: Props) => {
  const { list: animals, status, error } = useAppSelector(SelectAnimals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnimals());
  }, []);

  return (
    <div className={styles.container}>
      {status === Status.LOADING ? (
        <LoadingSpinner />
      ) : status === Status.ERROR ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error} />
      ) : (
        <>
          {animals.map((animal) => (
            <AnimalTile key={animal.id} animal={animal} deleteFunc={() => {}} />
          ))}
        </>
      )}
    </div>
  );
};

export default AnimalsList;
