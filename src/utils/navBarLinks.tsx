import { FcBarChart } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

export const options: {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
}[] = [
  {
    id: 1,
    text: "Boards",
    path: "/",
    icon: <FcBarChart />,
  },
  {
    id: 2,
    text: "Profile",
    path: "/profile",
    icon: <FaUserCircle />,
  },
];
