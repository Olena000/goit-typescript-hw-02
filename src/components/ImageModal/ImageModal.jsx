import Modal from "react-modal";

export default function ImageModal({ modalIsOpen, onCloseModal, src, alt }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { backgroundColor: "rgba(0,0,0, 0.6) " },
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <img src={src} alt={alt} />
    </Modal>
  );
}
