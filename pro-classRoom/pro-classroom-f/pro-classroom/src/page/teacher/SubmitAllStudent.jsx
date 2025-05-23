import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GetAllSubmitStudent } from "@/redux/api/GetAllSubmitStudent";
import { openSubmittedAssignment } from "@/redux/api/openSubmittedAssignment";
import { checkAssigmentSimiller } from "@/redux/api/checkAssigmentSimiller";

export const SubmitAllStudent = () => {
  const { assignmentId } = useParams();
  const dispatch = useDispatch();

  const {
    students: submissions,
    loading,
    error,
  } = useSelector((state) => state.enrollStudent);

  const {
    result: similarityResults,
    loading: similarityLoading,
    error: similarityError,
  } = useSelector((state) => state.similarity);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    dispatch(GetAllSubmitStudent(assignmentId));
  }, [dispatch, assignmentId]);

  const handleCheckSimilarity = () => {
    const fileUrls = submissions.map((s) => s.fileUrl);
    dispatch(checkAssigmentSimiller(fileUrls));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Assignment ID: {assignmentId}</h1>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-500">Error: {error.message || error}</p>}
      {!loading && submissions.length === 0 && <p>No students submitted.</p>}

      <ul className="space-y-2">
        {submissions.map((submission) => {
          const student = submission.student;
          return (
            <li
              key={submission.submissionid}
              className="border p-2 rounded flex justify-between items-center shadow-sm bg-gray-50"
            >
              <div>
                <strong>Name:</strong> {student.firstname} {student.secondname}
                <br />
                <strong>Email:</strong> {student.email}
              </div>
              <Button
                className="ml-4"
                onClick={() => openSubmittedAssignment(submission.fileUrl)}
              >
                Open Submit Assignment
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center mt-4">
        <Button onClick={handleCheckSimilarity} disabled={similarityLoading}>
          {similarityLoading ? "Checking..." : "Check Similar Assignment"}
        </Button>
      </div>

      {similarityError && (
        <p className="text-red-500 text-center mt-4">
          Error: {similarityError}
        </p>
      )}

      {similarityResults && similarityResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Similarity Results:
          </h2>
          <ul className="space-y-3">
            {similarityResults.map((item, index) => (
              <li
                key={index}
                className="border rounded p-4 bg-gray-50 shadow-sm"
              >
                <p>
                  <strong>File 1:</strong> {item.pdf1}
                </p>
                <p>
                  <strong>File 2:</strong> {item.pdf2}
                </p>
                <p>
                  <strong>Similar Paragraphs:</strong> {item.similarParagraphs}
                </p>
                <p>
                  <strong>Similarity Score:</strong>{" "}
                  {item.similarityPercentPdf1}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
