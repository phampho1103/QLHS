<<<<<<< HEAD
import "../css/createListClass.css";
import { useState, useEffect } from "react";
import { db, collection, getDocs, query, where, doc } from "../firebaseConfig";

function CreateListClass() {
  const [classList, setClassList] = useState([]); // State to store retrieved class list
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class
  const [studentList, setStudentList] = useState([]); // State for student list

  // Function to fetch class names from Firebase on component mount
  useEffect(() => {
    const fetchClassList = async () => {
      const collectionPath = `/qlhs/danhsachlop/danhsachlop`; // Dynamic collection path based on class
      const qlhsRef = collection(db, collectionPath); // Reference to the "qlhs" collection
      const querySnapshot = await getDocs(qlhsRef);

      const classData = [];
      querySnapshot.forEach((doc) => {
        // Get the document ID (which represents the class name)
        const className = doc.id;
        classData.push(className);
      });

      setClassList(classData); // Update state with retrieved class names
    };

    fetchClassList();
  }, []);

  // Function to handle class click
  const handleClassClick = async (className) => {
    if (!className) {
      return;
    }

    setSelectedClass(className); // Use original class name

    // Fetch students for the selected class using subcollection reference
    const studentsRef = collection(db, `qlhs/danhsachlop/danhsachlop/${className}/danhsach${className}`);
    const studentQuery = query(studentsRef); // No filtering needed for entire class data retrieval

    const studentSnapshot = await getDocs(studentQuery);
    const studentData = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Update state with retrieved students for the selected class
    setStudentList(studentData);
  };

  return (
    <div className="createListClass">
      <div className="class-list">
        <h3>DANH SÁCH CÁC LỚP</h3>
        <div className="list-btn">
          {classList.map((cl) => (
            <button key={cl} onClick={() => handleClassClick(cl)}>
              {cl}
            </button>
          ))}
        </div>
      </div>
      {selectedClass && (
        <div>
          <div className="display-class-list">
            <h3>DANH SÁCH LỚP {selectedClass.toUpperCase()}</h3>
            <div className="class-name-size">
              <div className="class-name">
                <label htmlFor="class">Lớp:</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={selectedClass}
                  readOnly
                />
              </div>
              <div className="class-size">
                <label htmlFor="class-size">Sỉ số:</label>
                <input
                  type="text"
                  id="class-size"
                  name="class-size"
                  value={studentList.length}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div>
            <table className="tg table" style={{ tableLayout: "fixed", width: "100%" }}>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="tg-b0es">STT</th>
                  <th className="tg-b0es">Họ và tên</th>
                  <th className="tg-b0es">Giới tính</th>
                  <th className="tg-b0es">Năm sinh</th>
                  <th className="tg-b0es">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => (
                  <tr key={student.id}>
                    <td className="tg-wk8r">{index + 1}</td>
                    <td className="tg-oe15">{student.name}</td>
                    <td className="tg-oe15">
                      {student.gender === "male" ? "Nam" : "Nữ"}
                    </td>
                    <td className="tg-oe15">
                      {new Date(student.dateOfBirth).getFullYear()}
                    </td>
                    <td className="tg-oe15">{student.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

=======
import "../css/createListClass.css";
import { useState, useEffect } from "react";
import { db, collection, getDocs, query, where, doc } from "../firebaseConfig";

function CreateListClass() {
  const [classList, setClassList] = useState([]); // State to store retrieved class list
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class
  const [studentList, setStudentList] = useState([]); // State for student list

  // Function to fetch class names from Firebase on component mount
  useEffect(() => {
    const fetchClassList = async () => {
      const collectionPath = `/qlhs/danhsachlop/danhsachlop`; // Dynamic collection path based on class
      const qlhsRef = collection(db, collectionPath); // Reference to the "qlhs" collection
      const querySnapshot = await getDocs(qlhsRef);

      const classData = [];
      querySnapshot.forEach((doc) => {
        // Get the document ID (which represents the class name)
        const className = doc.id;
        classData.push(className);
      });

      setClassList(classData); // Update state with retrieved class names
    };

    fetchClassList();
  }, []);

  // Function to handle class click
  const handleClassClick = async (className) => {
    if (!className) {
      return;
    }

    setSelectedClass(className); // Use original class name

    // Fetch students for the selected class using subcollection reference
    const studentsRef = collection(db, `qlhs/danhsachlop/danhsachlop/${className}/danhsach${className}`);
    const studentQuery = query(studentsRef); // No filtering needed for entire class data retrieval

    const studentSnapshot = await getDocs(studentQuery);
    const studentData = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Update state with retrieved students for the selected class
    setStudentList(studentData);
  };

  return (
    <div className="createListClass">
      <div className="class-list">
        <h3>DANH SÁCH CÁC LỚP</h3>
        <div className="list-btn">
          {classList.map((cl) => (
            <button key={cl} onClick={() => handleClassClick(cl)}>
              {cl}
            </button>
          ))}
        </div>
      </div>
      {selectedClass && (
        <div>
          <div className="display-class-list">
            <h3>DANH SÁCH LỚP {selectedClass.toUpperCase()}</h3>
            <div className="class-name-size">
              <div className="class-name">
                <label htmlFor="class">Lớp:</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={selectedClass}
                  readOnly
                />
              </div>
              <div className="class-size">
                <label htmlFor="class-size">Sỉ số:</label>
                <input
                  type="text"
                  id="class-size"
                  name="class-size"
                  value={studentList.length}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div>
            <table className="tg table" style={{ tableLayout: "fixed", width: "100%" }}>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="tg-b0es">STT</th>
                  <th className="tg-b0es">Họ và tên</th>
                  <th className="tg-b0es">Giới tính</th>
                  <th className="tg-b0es">Năm sinh</th>
                  <th className="tg-b0es">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => (
                  <tr key={student.id}>
                    <td className="tg-wk8r">{index + 1}</td>
                    <td className="tg-oe15">{student.name}</td>
                    <td className="tg-oe15">
                      {student.gender === "male" ? "Nam" : "Nữ"}
                    </td>
                    <td className="tg-oe15">
                      {new Date(student.dateOfBirth).getFullYear()}
                    </td>
                    <td className="tg-oe15">{student.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

>>>>>>> origin/master
export default CreateListClass;