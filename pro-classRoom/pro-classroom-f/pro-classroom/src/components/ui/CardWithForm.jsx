import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OpenProjectPage } from "@/page/OpenProjectPage";

const nameofsection = ["A", "B", "C"];
const existingProjects = [
  { name: "Java", section: "A" },
  { name: "Python", section: "B" },
];

export function CardWithForm({ openProjectPage }) {
  const [projectName, setProjectName] = useState("");
  const [section, setSection] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    const projectExists = existingProjects.find(
      (project) => project.name === projectName && project.section === section
    );

    if (projectExists) {
      OpenProjectPage(projectExists);
    } else {
      alert("Project not found! Would you like to create a new one?");
    }
  };

  return (
    <Card className="aspect-video rounded-xl bg-muted/50">
      <CardHeader>
        <CardTitle>Assignment</CardTitle>
        <CardDescription>Last Date of Assignment.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onsubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name Assignment</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Select Section</Label>
              <Select onValueChange={setSection}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {nameofsection.map((sect) => (
                    <SelectItem key={sect} value={sect}>
                      {sect}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between">
            <Button type="submit">Find</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
