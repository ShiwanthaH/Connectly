import { Avatar } from "@material-tailwind/react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="w-[100vw] max-w-[100vw] h-[60px] bg-gray-200 flex justify-between items-center shadow-md">
      <img src={Logo} alt="logo" className="w-[140px] ml-8" />
      <Avatar
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        className="mr-8"
      />
    </div>
  );
};

export default Header;
