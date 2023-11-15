import React, { useCallback, useEffect, useMemo } from 'react';
import { SelectAnimals, deleteAnimal, fetchAnimals } from '../../redux/slices/animalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';
import LoadingSpinner from '../LoadingSpinner';
import { Empty, Modal } from 'antd';
import AnimalTile from '../AnimalTile';
import styles from './AnimalsList.module.scss';
import classNames from 'classnames';
import { IAnimal } from '../../models/IAnimal';
import { SelectAreas } from '../../redux/slices/allocationSlice';

const { confirm } = Modal;

type Props = {};

const AnimalsList = (props: Props) => {
  const { list, status, error } = useAppSelector(SelectAnimals);
  const areas = useAppSelector(SelectAreas);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnimals());
  }, []);

  const checkInArea = useCallback(
    (animal: IAnimal) => {
      return (
        areas.find((area) => area.first?.id === animal.id || area.second?.id === animal.id) !==
        undefined
      );
    },
    [areas],
  );

  const animals = useMemo(() => list, [list]);

  const handleDelete = async (animal: IAnimal) => {
    confirm({
      title: 'Вы точно хотите удалить животное?',
      content: (
        <div>
          <b>Внимание:</b> Данное действие будет невозможно отменить.
        </div>
      ),
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
          {animals.map((animal) => {
            const disabled = checkInArea(animal);
            return (
              <AnimalTile
                key={animal.id}
                animal={animal}
                disabled={disabled}
                tip={disabled ? 'Уже находится в вольере' : 'Перетащите в вольер'}
                deleteFunc={() => handleDelete(animal)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default AnimalsList;
