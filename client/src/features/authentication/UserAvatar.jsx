import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";
import Button from "../../ui/Button";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-00);
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-grey-000);
  cursor: pointer;
`;

const Username = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const EnlargedAvatar = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  object-fit: cover;
`;

function ModalContent({ avatar, fullName, onCloseModal }) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    onCloseModal();
    navigate("/account");
  };

  return (
    <div>
      <EnlargedAvatar
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <Button $size="small" onClick={handleButtonClick}>
        <HiPencil />
      </Button>
    </div>
  );
}

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <Modal>
      <StyledUserAvatar>
        <Modal.Open opens="avatarModal">
          <Avatar
            src={avatar || "/default-user.jpg"}
            alt={`Avatar of ${fullName}`}
          />
        </Modal.Open>
        <Username>{fullName}</Username>
      </StyledUserAvatar>

      <Modal.Window name="avatarModal">
        <ModalContent avatar={avatar} fullName={fullName} />
      </Modal.Window>
    </Modal>
  );
}
