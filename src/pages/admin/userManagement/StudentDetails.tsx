import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>This is a student details components of {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
