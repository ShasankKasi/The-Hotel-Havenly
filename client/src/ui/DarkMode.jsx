import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../hooks/useDarkMode";

export default function DarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const k = isDarkMode ? "Enable Light Mode" : "Enable Dark Mode";
  return (
    <ButtonIcon onClick={toggleDarkMode} $show={k}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
