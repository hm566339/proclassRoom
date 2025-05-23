import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "@/redux/userSlice";

const profile = {
  src: "image", // Replace with actual image URL
  name: "Manoj Purohit",
  detail: "Detail according to the submitted data",
};

export default function CardDemo() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleClick = async () => {
    try {
      const response = await dispatch(fetchUserData()).unwrap();
      // console.log("User data fetched:", response);
      navigate("/teacher-dashboard/profileview");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <Card className="max-w-sm flex flex-col items-center bg-muted/50 rounded-xl p-4">
      <CardHeader className="w-32 h-32 rounded-full overflow-hidden">
        <img
          src={profile.src}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="text-center">
        <h6 className="text-lg font-semibold mt-4">
          {user ? `${user.firstname} ${user.secondname}` : profile.name}
        </h6>
        <p className="my-1 text-foreground">
          {user ? user.sub : profile.detail}
        </p>
        <Button className="mt-2" onClick={handleClick}>
          <NavLink to="profileview">View Profile</NavLink>
        </Button>
      </CardBody>
    </Card>
  );
}
