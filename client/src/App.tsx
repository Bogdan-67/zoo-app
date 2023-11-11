import React from 'react';
import './App.css';
import AreasInput from './components/AreasInput';
import AnimalsList from './components/AnimalsList';
import { Col, Row } from 'antd';

function App() {
  return (
    <div className='App'>
      <AreasInput />
      <Row>
        <Col span={16}></Col>
        <Col span={8}>
          <AnimalsList />
        </Col>
      </Row>
    </div>
  );
}

export default App;
