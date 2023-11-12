import React from 'react';
import './App.css';
import AreasInput from './components/AreasInput';
import AnimalsList from './components/AnimalsList';
import { Col, Row } from 'antd';
import './styles/app.scss';
import AreasList from './components/Areas/AreasList';
import Menu from './components/Menu';

function App() {
  return (
    <div className='App'>
      <AreasInput />
      <Row gutter={20} className='mt20'>
        <Col span={16}>
          <AreasList />
        </Col>
        <Col span={8}>
          <AnimalsList />
          <Menu />
        </Col>
      </Row>
    </div>
  );
}

export default App;
