import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const FamilySetCheckModal = (props: {
  isOpen: boolean;
  inputValue: string;
}) => {

  return (
    <Modal
      className="familySetCheckModal"
      isOpen={props.isOpen}
    >
      <div className="familySetCheckModal__spanBox">
        <span className="familySetCheckModal__spanBox__span">
          이렇게 소개할까요?
        </span>
      </div>
      <div className="familySetCheckModal__buttonBox">
        <button className="familySetCheckModal__buttonBox__yesButton">
          <span className="familySetCheckModal__buttonBox__yesButton__span">
            네
          </span>
        </button>
        <button className="familySetCheckModal__buttonBox__noButton">
          <span className="familySetCheckModal__buttonBox__noButton__span">
            아니오
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default FamilySetCheckModal;