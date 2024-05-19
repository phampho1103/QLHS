import "../css/LookUpStudents.css";
import { useState } from "react";

function LookUpStudents() {
  const [check, setCheck] = useState(null);
  // const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [classInfo, setClassInfo] = useState({
    className: "",
    subject: "",
    semester: "",
  });
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    fullName: "",
    score15: "",
    score1tiet: "",
    average: "",
  });

  const handleClassInfoChange = (e) => {
    const { name, value } = e.target;
    setClassInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStudentDataChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    if (
      studentData.fullName &&
      studentData.score15 &&
      studentData.score1tiet &&
      studentData.average
    ) {
      setStudents((prevStudents) => [...prevStudents, studentData]);
      setStudentData({
        fullName: "",
        score15: "",
        score1tiet: "",
        average: "",
      });
    }
  };

  const handlePrintBt1 = () => {
    // setCheck(true);
    // window.print();
  };
  const handlePrintBt2 = () => {
    setCheck(true);
    // window.print();
  };

  return (
    <div className="lookUpStudents">
      <form method="POST" action="" className="form">
        <div className="form-wrap">
          <div className="form-title">BẢNG ĐIỂM</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
              <label htmlFor="className">Lớp</label>
              <select
                id="className"
                name="className"
                value={classInfo.className}
                onChange={handleClassInfoChange}
              >
                <option value="" disabled>
                  Chọn lớp
                </option>
                <option value="12A1">12A1</option>
                <option value="12A2">12A2</option>
                <option value="12A3">12A3</option>
                <option value="12A4">12A4</option>
                <option value="12A5">12A5</option>
              </select>
            </div>
            <div className="form-input-item-half">
              <label htmlFor="semester">Học kỳ</label>
              <select
                id="semester"
                name="semester"
                value={classInfo.semester}
                onChange={handleClassInfoChange}
              >
                <option value="" disabled>
                  Chọn học kỳ
                </option>
                <option value="hk1">HK I</option>
                <option value="hk2">HK II</option>
              </select>
            </div>
          </div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
              <label htmlFor="subject">Môn học</label>
              <select
                id="subject"
                name="subject"
                value={classInfo.subject}
                onChange={handleClassInfoChange}
              >
                <option value="" disabled>
                  Chọn môn
                </option>
                <option value="toan">Toán</option>
                <option value="ly">Lý</option>
                <option value="hoa">Hóa</option>
                <option value="sinh">Sinh</option>
                <option value="anh">Anh</option>
                <option value="van">Văn</option>
              </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
        </div>
      </form>
      <table
        className="tg table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr>
            <th className="tg-b0es">STT</th>
            <th className="tg-b0es">Họ Tên</th>
            <th className="tg-b0es">Điểm 15'</th>
            <th className="tg-b0es">Điểm 1 tiết</th>
            <th className="tg-b0es">Điểm TB</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="tg-wk8r">{index + 1}</td>
              <td className="tg-oe15">{student.fullName}</td>
              <td className="tg-oe15">{student.score15}</td>
              <td className="tg-oe15">{student.score1tiet}</td>
              <td className="tg-oe15">{student.average}</td>
            </tr>
          ))}
          {/* Ô nhập liệu cho học sinh mới */}
          <tr>
            <td className="tg-wk8r">{students.length + 1}</td>
            <td className="tg-oe15">
              <input
                type="text"
                name="fullName"
                value={studentData.fullName}
                onChange={handleStudentDataChange}
                onBlur={handleBlur}
              />
            </td>
            <td className="tg-oe15">
              <input
                type="text"
                name="score15"
                value={studentData.score15}
                onChange={handleStudentDataChange}
                onBlur={handleBlur}
              />
            </td>
            <td className="tg-oe15">
              <input
                type="text"
                name="score1tiet"
                value={studentData.score1tiet}
                onChange={handleStudentDataChange}
                onBlur={handleBlur}
              />
            </td>
            <td className="tg-oe15">
              <input
                type="text"
                name="average"
                value={studentData.average}
                onChange={handleStudentDataChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-group">
        <button
          className="btn btn-green"
          type="button"
          onClick={handlePrintBt1}
          style={{ backgroundColor: "#0d6efd" }}
        >
          THÊM HỌC SINH
        </button>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-green"
          type="button"
          onClick={handlePrintBt2}
          style={{ backgroundColor: "#0d6efd" }}
        >
          HIỂN THỊ BẢNG ĐIỂM
        </button>
      </div>
      {check && (
        <div className="result">
          <div className="result-title">DANH SÁCH HỌC SINH</div>
          <div className="result-table">
            <table
              className="tg"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <colgroup>
                <col style={{ width: "5%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="tg-b0es">STT</th>
                  <th className="tg-b0es">Họ và Tên</th>
                  <th className="tg-b0es">Diểm 15'</th>
                  <th className="tg-b0es">Điểm 1 tiết</th>
                  {/* <th className="tg-b0es">Điểm thi</th> */}
                  <th className="tg-b0es">Điểm trung bình</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                  <td className="tg-oe15">10</td>
                  <td className="tg-oe15">10</td>
                  <td className="tg-oe15">{(8 + 9 * 2 + 10 * 3) / 6}</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                  <td className="tg-oe15">8</td>
                  <td className="tg-oe15">9</td>
                  <td className="tg-oe15">{(8 + 9 * 2 + 10 * 3) / 6}</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                  <td className="tg-oe15">8</td>
                  <td className="tg-oe15">9</td>
                  <td className="tg-oe15">{(8 + 9 * 2 + 10 * 3) / 6}</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                  <td className="tg-oe15">8</td>
                  <td className="tg-oe15">9</td>
                  <td className="tg-oe15">{(8 + 9 * 2 + 10 * 3) / 6}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default LookUpStudents;
