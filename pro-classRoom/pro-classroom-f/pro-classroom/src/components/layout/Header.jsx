import { NavLink } from "react-router";
export const Header = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 ">
      <div>
        <NavLink to="/" className="text-2xl font-bold cursor-pointer">
          Pro Classroom
        </NavLink>
      </div>

      <nav>
        <ul className="flex space-x-6">
          <li className=" text-black px-4 py-2 rounded-lg hover:bg-gray-200 ">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            <NavLink to="/About">About</NavLink>
          </li>
          <li className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            <NavLink to="/Contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
//
