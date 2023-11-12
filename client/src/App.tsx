import React from 'react';
import './App.css';
import AreasInput from './components/AreasInput';
import AnimalsList from './components/AnimalsList';
import { Button, Col, Flex, Row } from 'antd';
import './styles/app.scss';
import AreasList from './components/Areas/AreasList';
import GenerateButton from './components/GenerateButton';

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
          <Flex vertical gap={10} className='mt20'>
            <Button>Добавить животное</Button>
            <GenerateButton />
            <Button type='primary'>Сохранить</Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}

export default App;
