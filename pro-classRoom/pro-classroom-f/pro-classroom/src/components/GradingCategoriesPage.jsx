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
import { createGradingCategory } from "@/redux/api/createGradingCategory";

export function GradingCategoriesPage() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.gradingCategories
  );

  // Local state for the form
  const [gradingCategory, setGradingCategory] = useState({
    classRoom: "",
    weight: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGradingCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(createGradingCategory(gradingCategory));
    alert("✅ Grading Category created successfully!");
  };

  const handleFormReset = () => {
    setGradingCategory({ classRoom: "", weight: "", name: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add New Grading Category</CardTitle>
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
                  value={gradingCategory.classRoom}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Enter weight (in percentage)"
                  value={gradingCategory.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter category name"
                  value={gradingCategory.name}
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
