import { Col, Row } from 'antd';
import { useAppSelector } from '../../hooks/redux';
import { SelectAreas } from '../../redux/slices/allocationSlice';
import styles from './AreasList.module.scss';
import classNames from 'classnames';
import Area from './Area';

type Props = {};

const AreasList = (props: Props) => {
  const areas = useAppSelector(SelectAreas);
  return (
    <section className={classNames('container', styles.wrapper)}>
      {areas.length > 0 ? (
        <div className={styles.list}>
          {areas.map((area, index) => (
            <Area area={area} nomer={index + 1} />
          ))}
        </div>
      ) : (
        <Col span={24}>Не создано ни одного вольера. Введите количество вольеров</Col>
      )}
    </section>
  );
};

export default AreasList;
