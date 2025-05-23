import { CardContent, CardTitle } from "@/components/ui/card";
import { Button, Card, CardFooter, CardHeader } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "@/redux/userSlice";
import { jwtDecode } from "jwt-decode";

export const Profileview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then((response) => {
        // console.log("Fetched user data:", response);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [dispatch]);

  const handleEditClick = () => {
    console.log("Edit profile clicked!");
  };

  const Dashbord = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const decode = jwtDecode(token);
    // console.log(decode.role);
    if (decode.role == "TEACHER") {
      navigate("/teacher-dashboard");
    }
    if (decode.role == "STUDENT") {
      navigate("/student-dashboard");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Card>
        <CardHeader className="p-3 m-1">
          <CardTitle className="text-center text-2xl font-bold">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 p-3 m-1">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="fname">
                  Full Name :
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left text-2xl" htmlFor="lname">
                  {userInfo
                    ? `${userInfo.firstname} ${userInfo.secondname}`
                    : "Loading..."}
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="teacherId">
                  Teacher ID :
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left text-2xl" htmlFor="teacherId">
                  {userInfo ? userInfo.id : "Loading..."}
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="address">
                  Address :
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left text-2xl" htmlFor="address">
                  {userInfo ? userInfo.address : "Loading..."}
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="subject">
                  Subject :
                </Label>
              </div> */}
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left text-2xl" htmlFor="subject">
                  {userInfo ? userInfo.subject : "Loading..."}
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="email">
                  Email address :
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left text-2xl" htmlFor="email">
                  {userInfo ? userInfo.email : "Loading..."}
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-left w-45 text-2xl" htmlFor="phone">
                  Phone Number :
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Label className="text-center text-2xl" htmlFor="phone">
                  {userInfo ? userInfo.mobilenumber : "Loading..."}
                </Label>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4 gap-4">
              <Button
                className="bg-black h-10 w-24 text-white"
                onClick={Dashbord}
              >
                Back
              </Button>
              <Button
                className="bg-black h-10 w-24 text-white"
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                className="bg-black h-10 w-24 text-white"
                onClick={handleLogoutClick}
              >
                Log Out
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
