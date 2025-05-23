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
import { submitAssignment } from "@/redux/api/submitAssignment";
// import { CreateAssignment } from "@/redux/api/CreateAssignment";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams } from "react-router-dom";

async function loadPDFWorker() {
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
}
loadPDFWorker();

export function Submission() {
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [pageNumber, setPageNumber] = useState(1);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
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
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartDrag({
      x: e.clientX - canvasPosition.x,
      y: e.clientY - canvasPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCanvasPosition({
      x: e.clientX - startDrag.x,
      y: e.clientY - startDrag.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const nextPage = () =>
    pdf && pageNumber < pdf.numPages && setPageNumber((prev) => prev + 1);
  const prevPage = () => pageNumber > 1 && setPageNumber((prev) => prev - 1);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };
  const { assignmentId } = useParams();
  console.log(assignmentId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = localStorage.getItem("user");

    const submissionData = {
      assignmentId,
      studentId,
      feedback,
      file,
    };

    try {
      await submitAssignment(submissionData);
      alert("Assignment submitted successfully!");
    } catch (error) {
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <div className="flex">
      <Card className="w-[400px] m-5">
        <CardHeader>
          <CardTitle>Submit Assignment</CardTitle>
          <CardDescription>
            Upload your work for this assignment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="assignmentId">Assignment ID</Label>
                <Input id="assignmentId" value={assignmentId} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="feedback">Feedback</Label>
                <Input
                  id="feedback"
                  placeholder="Feedback for the teacher"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">PDF File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between px-0 pb-0 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* PDF Preview Section */}
      <div
        className="flex-1 m-5 overflow-hidden relative"
        style={{ maxHeight: "600px", maxWidth: "100%" }}
        onMouseDown={handleMouseDown}
      >
        {file ? (
          <>
            <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>
            <canvas
              ref={canvasRef}
              className="border rounded"
              style={{
                cursor: "move",
                position: "absolute",
                top: canvasPosition.y + "px",
                left: canvasPosition.x + "px",
                userSelect: "none",
              }}
            />
            <div className="absolute bottom-5 right-5 flex space-x-2">
              <Button onClick={zoomIn}>Zoom In</Button>
              <Button onClick={zoomOut}>Zoom Out</Button>
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <Button onClick={prevPage} disabled={pageNumber <= 1}>
                Previous
              </Button>
              <Button
                onClick={nextPage}
                disabled={pageNumber >= (pdf?.numPages || 0)}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a PDF to preview it here</p>
        )}
      </div>
    </div>
  );
}
