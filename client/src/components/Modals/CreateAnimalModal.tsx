import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import CreateAnimalForm from '../Forms/CreateAnimalForm';

const CreateAnimalModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createAnimalFormRef = React.createRef<HTMLFormElement>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (createAnimalFormRef.current) {
      createAnimalFormRef.current.submitForm();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    message.success('Животное успешно создано');
  };

  const handleError = (error: string) => {
    message.error(error);
  };

  return (
    <>
      <Button onClick={showModal}>Добавить животное</Button>
      <Modal
        title='Добавление животного'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={'Отмена'}
        okText={'Сохранить'}>
        <CreateAnimalForm
          ref={createAnimalFormRef}
          onError={handleError}
          onSuccess={handleSuccess}
          showOkBtn={false}
        />
      </Modal>
    </>
  );
};

export default CreateAnimalModal;
