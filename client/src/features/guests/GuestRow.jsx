import styled from "styled-components";
import CreateCabinForm from "./CreateGuestForm";
import { HiTrash, HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useDeleteGuest from "./useDeleteGuest";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const IdN = styled.div`
  font-family: "Sono";
  font-weight: 600;
  width: 3rem;
  text-align: center;
`;

const Nation = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();
  const { id: guestId, fullName, email, nationalID, nationality } = guest;

  return (
    <Table.Row>
      {/* <Flag src={countryFlag} alt="Flag image" /> */}
      <IdN>{guestId}</IdN>
      <Guest>{fullName}</Guest>
      <div>{email}</div>
      <div>{nationalID}</div>
      <Nation>{nationality}</Nation>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />

            <Menus.List id={guestId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"guests"}
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
