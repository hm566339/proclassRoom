import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export const Filterstudent = () => {
  return (
    <Form>
      <form className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Label htmlFor="picture" className="whitespace-nowrap">
            Upload in PDF
          </Label>
          <Input id="picture" type="file" className="flex-1" />
          <Button className="w-auto">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
