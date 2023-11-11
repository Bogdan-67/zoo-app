import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {};

const LoadingSpinner = (props: Props) => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
};

export default LoadingSpinner;
