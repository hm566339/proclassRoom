import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
// import { submitAssignment } from "@/redux/api/submitAssignment";
import { CreateAssignment } from "@/redux/api/CreateAssignment";
import { cn } from "@/lib/utils";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// Import worker dynamically to avoid issues with default export
async function loadPDFWorker() {
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
}

loadPDFWorker(); // Load the worker dynamically

export function Assignment() {
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [ClassRoomId, setClassRoomId] = useState("");
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [scale, setScale] = useState(1.0); // Zoom scale
  const [pageNumber, setPageNumber] = useState(1); // Current page
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 }); // Position of the canvas
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 }); // Starting point for dragging
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      if (!file) return;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPDF();
  }, [file]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPDF = async () => {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
    };

    renderPDF();
  }, [pdf, scale, pageNumber]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only drag on left-click

    // Set dragging state to true
    setIsDragging(true);

    // Store the start position when the mouse is first pressed
    setStartDrag({
      x: e.clientX - canvasPosition.x,
      y: e.clientY - canvasPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only move if dragging is active

    // Calculate the new position based on mouse movement
    setCanvasPosition({
      x: e.clientX - startDrag.x,
      y: e.clientY - startDrag.y,
    });
  };

  const handleMouseUp = () => {
    // Stop dragging when the mouse is released
    setIsDragging(false);
  };

  useEffect(() => {
    // Bind the mousemove and mouseup events to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup listeners on component unmount or drag end
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Limit max zoom to 2x
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Limit min zoom to 0.5x
  };

  const nextPage = () => {
    if (pdf && pageNumber < pdf.numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pdf && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")); // ✅ Parse JSON

    const assignmentData = {
      title,
      description,
      dueDate: date ? format(date, "yyyy-MM-dd") : "", // ✅ but "" is BAD if no date
      max_score: maxScore,
      ClassRoomId,
      CreateBy: user?.id || user, // Adjust as needed
      file,
    };

    try {
      const response = await CreateAssignment(assignmentData);
      console.log("Assignment created successfully:", response);
      alert("Assignment posted successfully!");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Error submitting assignment. See console for details.");
    }
  };

  return (
    <div className="flex">
      {/* Form Section */}
      <Card className="w-[400px] m-5">
        <CardHeader>
          <CardTitle>Create Assignment</CardTitle>
          <CardDescription>
            Submit an assignment to the classroom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ClassRoomId">Class Room ID</Label>
                <Input
                  id="ClassRoomId"
                  placeholder="Class Room ID"
                  value={ClassRoomId}
                  onChange={(e) => setClassRoomId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title of the assignment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of the assignment"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="max_score">Max Score</Label>
                <Input
                  id="max_score"
                  placeholder="Max score"
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Assignment File (PDF)</Label>
                <Input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>

            <CardFooter className="flex justify-between px-0 pb-0 pt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Submit Assignment</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* PDF Preview Section */}
      <div
        className="flex-1 m-5 w-3 overflow-hidden relative"
        style={{ maxHeight: "600px", maxWidth: "100%" }}
        onMouseDown={handleMouseDown} // Trigger drag
      >
        {file ? (
          <>
            <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>

            <canvas
              ref={canvasRef}
              className="border rounded"
              style={{
                cursor: "move", // Change cursor to indicate drag
                position: "absolute",
                top: canvasPosition.y + "px",
                left: canvasPosition.x + "px",
                userSelect: "none", // Prevent text selection on canvas
              }}
            />

            {/* Zoom Controls */}
            <div className="absolute bottom-5 right-5 flex space-x-2">
              <Button onClick={zoomIn}>Zoom In</Button>
              <Button onClick={zoomOut}>Zoom Out</Button>
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <Button onClick={prevPage} disabled={pageNumber <= 1}>
                Previous
              </Button>
              <Button
                onClick={nextPage}
                disabled={pageNumber >= (pdf ? pdf.numPages : 0)}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a PDF to preview here</p>
        )}
      </div>
    </div>
  );
}
