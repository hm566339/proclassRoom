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
import { useDispatch } from "react-redux";
// import { addClassroom } from "@/redux/clsssroomSlice";
import { postClassroomToAPI } from "@/redux/api/postClassroomToAPI";

export function Addclassroom({ backHome }) {
  const user = localStorage.getItem("user");

  const dispatch = useDispatch();

  const [room, setRoom] = useState({
    className: "",
    subject: "",
    section: "",
    teacherId: `${user}`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(postClassroomToAPI(room)); // Send data to Redux store
    // console.log("Data added to Redux:", room);
    alert("✅ Classroom created successfully!");
    setRoom({ className: "", section: "", subject: "", teacherId: user });
  };

  const handleFormReset = () => {
    setRoom({ className: "", section: "", subject: "", teacherId: user });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add New Classroom</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="classroom">Class Name</Label>
                <Input
                  id="classroom"
                  name="className"
                  placeholder="Enter class name"
                  value={room.className}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  name="section"
                  placeholder="Enter section"
                  value={room.section}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={room.subject}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" onClick={handleFormReset}>
                Clear
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
