import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import { GrUserWorker } from "react-icons/gr";

function Users() {
  return (
    <>
      <Heading as="h1">
        Create a new user <GrUserWorker />
      </Heading>
      <SignupForm />
    </>
  );
}

export default Users;
