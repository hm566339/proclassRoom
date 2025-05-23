import React, { useState } from "react";

function AssignmentDisplay() {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleButtonClick = async (assignmentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/assignments/${assignmentId}`);
      if (!response.ok) {
        throw new Error("Assignment not found or server error");
      }
      const assignmentData = await response.json();
      if (assignmentData && assignmentData.directoryPath) {
        setAssignment(assignmentData);
      } else {
        setError("Assignment file not found.");
      }
    } catch (err) {
      setError(err.message || "Error fetching assignment data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => handleButtonClick("assignment-id-123")}
        id="assignment"
        className="btn btn-primary"
      >
        Fetch Assignment
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {assignment && (
        <div>
          <h2>Assignment: {assignment.title}</h2>
          <p>{assignment.description}</p>
          {assignment.directoryPath && (
            <div>
              <h3>Assignment File:</h3>
              <embed
                src={assignment.directoryPath}
                type="application/pdf"
                width="600"
                height="400"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default AssignmentDisplay;
