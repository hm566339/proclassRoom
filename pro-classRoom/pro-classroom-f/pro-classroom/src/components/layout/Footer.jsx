import { NavLink } from "react-router";
export const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mb-2">© 2025 Pro Classroom | All Rights Reserved</p>
        <div className="flex space-x-4">
          <NavLink to="/About" className="text-teal-300 hover:underline">
            About Us
          </NavLink>
          <NavLink to="/Contact" className="text-teal-300 hover:underline">
            Contact us
          </NavLink>
        </div>
      </div>
    </>
  );
};
