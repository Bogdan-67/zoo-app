import React, { useEffect } from 'react';
import { SelectAnimals, deleteAnimal, fetchAnimals } from '../../redux/slices/animalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';
import LoadingSpinner from '../LoadingSpinner';
import { Empty, Modal } from 'antd';
import AnimalTile from '../AnimalTile';
import styles from './AnimalsList.module.scss';
import classNames from 'classnames';
import { IAnimal } from '../../models/IAnimal';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

type Props = {};

const AnimalsList = (props: Props) => {
  const { list: animals, status, error } = useAppSelector(SelectAnimals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnimals());
  }, []);

  const handleDelete = async (animal: IAnimal) => {
    confirm({
      title: 'Вы точно хотите удалить животное?',
      onOk() {
        return dispatch(deleteAnimal(animal));
      },
      okText: 'Да',
      onCancel() {},
      cancelText: 'Нет',
    });
  };

  return (
    <div className={classNames('container', styles.wrapper)}>
      {status === Status.LOADING ? (
        <LoadingSpinner />
      ) : status === Status.ERROR ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error} />
      ) : animals.length === 0 ? (
        <p>Нет ни одного животного. Создайте новых животных</p>
      ) : (
        <>
          {animals.map((animal) => (
            <AnimalTile
              key={animal.id}
              animal={animal}
              tip='Добавить в вольер'
              deleteFunc={() => handleDelete(animal)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AnimalsList;
