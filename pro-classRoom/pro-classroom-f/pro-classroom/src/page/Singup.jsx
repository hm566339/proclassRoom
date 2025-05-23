import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function Signup({ backHome }) {
  const [userType, setUserType] = useState("teacher");
  const [user, setUser] = useState({
    firstname: "",
    secondname: "",
    email: "",
    address: "",
    mobilenumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userData = {
        ...user,
        role: userType === "teacher" ? "TEACHER" : "STUDENT",
      };

      const response = await fetch(
        new URL("http://localhost:8581/api/v1/aurth/singup"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Signup successful!");
        backHome();
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFormReset = () => {
    setUser({
      firstname: "",
      secondname: "",
      email: "",
      address: "",
      mobilenumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <span>
                {userType === "teacher" ? "Teacher Signup" : "Student Signup"}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setUserType(userType === "teacher" ? "student" : "teacher")
                }
              >
                Switch to {userType === "teacher" ? "Student" : "Teacher"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    name="firstname"
                    placeholder="First Name"
                    value={user.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="sname">Last Name</Label>
                  <Input
                    id="sname"
                    name="secondname"
                    placeholder="Last Name"
                    value={user.secondname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="add">Address</Label>
                <Input
                  id="add"
                  name="address"
                  placeholder="Address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mob">Mobile Number</Label>
                <Input
                  id="mob"
                  name="mobilenumber"
                  placeholder="Mobile Number"
                  value={user.mobilenumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pass">Password</Label>
                  <Input
                    type="password"
                    id="pass"
                    name="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="spass">Confirm Password</Label>
                  <Input
                    type="password"
                    id="spass"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" onClick={handleFormReset}>
                Clean
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
