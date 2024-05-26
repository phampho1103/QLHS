import "../css/LookUpStudents.css";
import { useState } from "react";
import { db, collection, getDocs, doc } from "../firebaseConfig";


function LookUpStudents() {
  const [fullName, setFullName] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [searchStudent, setSearchStudent] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearch = async () => {
    setIsSearchClicked(true);

    if (classRoom) {
      const normalizedClassRoom = classRoom.toLowerCase().replace(/\s/g, "");
      const classRef = doc(db, `qlhs/danhsachlop/danhsachlop/${normalizedClassRoom}`);

      try {
        const snapshot = await getDocs(collection(classRef, `danhsach${normalizedClassRoom}`));
        const students = snapshot.docs.map((doc) => doc.data());

        const foundStudent = students.find((student) =>
          student.name && student.name.toLowerCase() === fullName.toLowerCase()
        );

        if (foundStudent) {
          const calculateAverage = (semester) => {
            const subjects = ["toan", "ly", "hoa", "sinh", "su", "dia", "van", "daoduc", "theduc"];
            let totalScore = 0;
            let validSubjects = 0;
            for (const subject of subjects) {
              const score = foundStudent[`${subject}_tb_${semester}`];
              if (score !== undefined) {
                totalScore += score;
                validSubjects++;
              }
            }
            return validSubjects > 0 ? totalScore / validSubjects : 0;
          };

          setSearchStudent({
            ...foundStudent,
            classRoom: classRoom, // Thêm dòng này để cập nhật classRoom
            averageHK1: calculateAverage("hk1"),
            averageHK2: calculateAverage("hk2"),
          });
        } else {
          setSearchStudent(null); // Không tìm thấy học sinh
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm học sinh:", error);
        setSearchStudent(null);
      }
    } else {
      setSearchStudent(null); // Chưa nhập lớp
    }
  };

  return (
    <div className="lookUpStudents">
      <div className="form-input-group-half">
        <div className="form-input-item-half">
          <label htmlFor="name">Họ và tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-input-item-half">
          <label htmlFor="class">Lớp:</label>
          <input
            type="text"
            id="class"
            name="class"
            value={classRoom}
            onChange={(e) => setClassRoom(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button
            className="btn btn-blue"
            id="btn-add"
            type="button"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      {isSearchClicked &&
        (searchStudent ? (
          <div>
            <div className="display-class-list">
              <h3>DANH SÁCH HỌC SINH</h3>
            </div>
            <div>
              <table
                className="tg table"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="tg-b0es">STT</th>
                    <th className="tg-b0es">Họ và tên</th>
                    <th className="tg-b0es">Lớp</th>
                    <th className="tg-b0es">TB Học Kỳ I</th>
                    <th className="tg-b0es">TB Học Kỳ II</th>
                  </tr>
                </thead>
                <tbody>
                  {searchStudent ? (
                    <tr>
                      <td className="tg-wk8r">1</td>
                      <td className="tg-oe15">{searchStudent.name}</td>
                      <td className="tg-oe15">{searchStudent.classRoom.toUpperCase()}</td>
                      <td className="tg-oe15">
                        {searchStudent.averageHK1.toFixed(2)}
                      </td>
                      <td className="tg-oe15">
                        {searchStudent.averageHK2.toFixed(2)}
                      </td>
                    </tr>
                  ) : isSearchClicked ? (
                    <tr>
                      <td className="no-student-message" colSpan="5">Không có học sinh có tên tương ứng</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          "Không có học sinh có tên tương ứng"
        ))}
    </div>
  );
}

export default LookUpStudents;
