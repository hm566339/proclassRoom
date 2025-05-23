import { useState } from "react";
import { useDispatch } from "react-redux";
import { EnrollClassApi } from "@/redux/api/EnrollClassApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const EnrollAndClass = () => {
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();

  const [room, setRoom] = useState({
    classRoom: "",
    student: user,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const enrollClass = (event) => {
    event.preventDefault();
    dispatch(EnrollClassApi(room));
    console.log("Data added to Redux:", room);
    alert("✅ Classroom enrolled successfully!");
    setRoom({ classRoom: "", student: user });
  };

  // Reset the form inputs
  const handleFormReset = () => {
    setRoom({ classRoom: "", student: user });
  };

  return (
    <Card className="w-[500px] m-5">
      <form onSubmit={enrollClass}>
        <div className="flex items-center space-x-4 m-4">
          <Label htmlFor="classRoom">Enroll Class</Label>
          <Input
            id="classRoom"
            name="classRoom"
            placeholder="Enter Enroll Id"
            value={room.classRoom}
            onChange={handleInputChange}
          />
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button" onClick={handleFormReset}>
            Clear
          </Button>
        </div>
      </form>
    </Card>
  );
};
