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
import { useDispatch, useSelector } from "react-redux";
import { postAnnouncementToAPI } from "@/redux/api/postAnnouncementToAPI";

export function Announcements({ backHome }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.announcement
  );

  const [announcement, setAnnouncement] = useState({
    content: "",
    classRoom: "",
    poster: `${user}`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(postAnnouncementToAPI(announcement));
    alert("✅ Classroom created successfully!");
  };

  const handleFormReset = () => {
    setAnnouncement({ content: "", classRoom: "", poster: user?.id || "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="classRoom">Class Room ID</Label>
                <Input
                  id="classRoom"
                  name="classRoom"
                  placeholder="Enter class room ID"
                  value={announcement.classRoom}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  name="content"
                  placeholder="Enter announcement content"
                  value={announcement.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" onClick={handleFormReset}>
                Clear
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
