import "../css/LookUpStudents.css";
import { useState, useEffect } from "react";
import { db, collection, doc, getDocs , updateDoc,getDoc } from "../firebaseConfig";

function LookUpStudents() {
  const [displayClassInfo, setDisplayClassInfo] = useState({
    className: "",
    subject: "",
    semester: "",
  });
  
  const [check, setCheck] = useState(null);
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
  });
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [subjectList, setSubjectList] = useState([]); // Thêm state này
  const [classList, setClassList] = useState([]); // Define classList and setClassList



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

  useEffect(() => {
    // Khi nhấn nút "HIỂN THỊ BẢNG ĐIỂM" hoặc khi classInfo thay đổi, lấy dữ liệu điểm
    if (check && classInfo.className && classInfo.subject && classInfo.semester) {
      fetchStudentScores();
    }
  }, [check, classInfo]); 

  const fetchStudentScores = async () => {
    const classCollectionRef = collection(
      db,
      `qlhs/danhsachlop/danhsachlop/${classInfo.className}/danhsach${classInfo.className}`
    );
    const snapshot = await getDocs(classCollectionRef);
    const studentList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStudents(studentList);
  };

  const fetchStudents = async () => {
    const classCollectionRef = collection(
      db,
      `qlhs/danhsachlop/danhsachlop/${classInfo.className}/danhsach${classInfo.className}`
    );
    const snapshot = await getDocs(classCollectionRef);
    const studentList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStudents(studentList);
    setCurrentStudentIndex(0);
  };

  const handleBlur = async () => {
    if (
      studentData.fullName &&
      studentData.score15 !== "" && // Kiểm tra cả hai điểm đã được nhập
      studentData.score1tiet !== "" &&
      classInfo.className &&
      classInfo.subject &&
      classInfo.semester
    ) {
      const studentName = studentData.fullName.toLowerCase();
      const existingStudent = students.find((s) => s.name && s.name.toLowerCase() === studentName);

      if (existingStudent) {
        const studentDocRef = doc(
          db,
          `qlhs/danhsachlop/danhsachlop/${classInfo.className}/danhsach${classInfo.className}`,
          existingStudent.id
        );

                // Chuyển đổi tên môn học thành không dấu và viết liền
                let subjectKey = classInfo.subject
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "")
                .toLowerCase();
          
              // Thay thế 'đ' thành 'd'
              subjectKey = subjectKey.replace(/đ/g, "d");

    const score15FieldName = `${subjectKey}_15p_${classInfo.semester}`;
    const score1tietFieldName = `${subjectKey}_1t_${classInfo.semester}`;
    const averageFieldName = `${subjectKey}_tb_${classInfo.semester}`;
        const score15 = parseFloat(studentData.score15);
        const score1tiet = parseFloat(studentData.score1tiet);
        const average = (score15 + score1tiet) / 2;

        const dataToUpdate = {
          [score15FieldName]: score15,
          [score1tietFieldName]: score1tiet,
          [averageFieldName]: average, // Lưu điểm trung bình
        };

        if (existingStudent[score15FieldName] || existingStudent[score1tietFieldName]) {
          alert(
            `Học sinh ${studentData.fullName} của lớp ${classInfo.className} đã có điểm môn ${classInfo.subject} học kì ${classInfo.semester}. Điểm sẽ được ghi đè.`
          );
        }

        await updateDoc(studentDocRef, dataToUpdate);
        setCurrentStudentIndex(currentStudentIndex + 1);
        fetchStudents();
        alert("Đã nhập điểm thành công");
      } else {
        alert(`Không có học sinh ${studentData.fullName} của lớp ${classInfo.className}.`);
      }

      setStudentData({ fullName: "", score15: "", score1tiet: "" });
    } else {
      alert("Vui lòng nhập đầy đủ họ tên và cả hai điểm 15' và 1 tiết.");
    }
  };

  const handleAddStudent = async () => { 
    await handleBlur(); // Gọi hàm handleBlur để xử lý ghi điểm
    fetchStudents(); // Tải lại danh sách học sinh sau khi thêm điểm
  };// Xử lý sự kiện khi nhấn nút "Thêm học sinh"
  const handlePrintBt2 = () => {
    setCheck(true);
    setDisplayClassInfo(classInfo); // Cập nhật giá trị hiển thị
  };

  useEffect(() => {
    // Fetch danh sách môn học khi component mount
    const fetchClassList = async () => {
      try {
        const danhsachlopRef = collection(db, "qlhs", "danhsachlop", "danhsachlop");
        const querySnapshot = await getDocs(danhsachlopRef);
        const classListData = querySnapshot.docs.map(doc => doc.id); // Lấy ID của các document (tên lớp)
        setClassList(classListData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lớp:", error);
      }
    };

    
    const fetchSubjects = async () => {
      try {
        const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc");
        const docSnapshot = await getDoc(danhsachmonhocRef); // Thay getDocs thành getDoc
        
        if (docSnapshot.exists()) {
          const subjectData = docSnapshot.data(); // Lấy dữ liệu từ document đầu tiên
          const subjectValues = Object.values(subjectData);
          setSubjectList(subjectValues); // Cập nhật subjectList
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách môn học:", error);
      }
    };
    fetchClassList();
    fetchSubjects(); 
  }, []);

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
                <option value="" disabled>Chọn lớp</option>
              {classList.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
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
                <option value="" disabled>Chọn môn</option>
              {subjectList.map((subjectName, index) => (
                <option key={index} value={subjectName}>
                  {subjectName}
                </option>
              ))}
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
</tr>
</thead>
      
      <tbody>
      {students.slice(0, currentStudentIndex + 1).map((student, index) => (
        <tr key={index}>
          <td className="tg-wk8r">{index + 1}</td>
          <td className="tg-oe15">
            <input
              type="text"
              name="fullName"
              value={studentData.fullName}
              onChange={handleStudentDataChange}
              // onBlur={handleBlur} // Xóa onBlur
            />
          </td>
          <td className="tg-oe15">
            <input
              type="text"
              name="score15"
              value={studentData.score15}
              onChange={handleStudentDataChange}
              // onBlur={handleBlur} // Xóa onBlur
            />
          </td>
          <td className="tg-oe15">
            <input
              type="text"
              name="score1tiet"
              value={studentData.score1tiet}
              onChange={handleStudentDataChange}
              // onBlur={handleBlur} // Xóa onBlur
            />
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    <div className="btn-group">
    <button
      className="btn btn-green"
      type="button"
      onClick={handleAddStudent} // Sửa lại onClick
      style={{ backgroundColor: "#0d6efd" }}
    >
      Nhập điểm học sinh này
    </button>
  </div>
      <div className="btn-group">
        <button
          className="btn btn-green"
          type="button"
          onClick={handlePrintBt2}
          style={{ backgroundColor: "#0d6efd" }}
        >
          Hiển thị bảng điểm của lớp hiện tại
        </button>
      </div>
      <br></br>
      <br></br>

      <form>
  <div className="form-wrap">
    <div className="form-title">
      <h3>Bảng điểm môn học</h3>
    </div>
    <div className="form-title">
      <h3>Lớp: {displayClassInfo.className}</h3> 
    </div>
    <div className="form-title">
      <h3>Học kì: {displayClassInfo.semester}</h3> 
    </div>
    <div className="form-title">
      <h3>Môn: {displayClassInfo.subject}</h3> 
    </div>
  </div>
</form>

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
              {students.map((student, index) => {
    // Chuyển đổi tên môn học thành không dấu và viết liền
    let subjectKey = classInfo.subject
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase()
      .replace(/đ/g, "d");

    const score15FieldName = `${subjectKey}_15p_${classInfo.semester}`;
    const score1tietFieldName = `${subjectKey}_1t_${classInfo.semester}`;
    const score15 = parseFloat(student[score15FieldName]) || 0; // Lấy điểm 15' hoặc 0 nếu không có
    const score1tiet = parseFloat(student[score1tietFieldName]) || 0; // Lấy điểm 1 tiết hoặc 0 nếu không có

    // Tính điểm trung bình chỉ khi cả hai điểm đều là số
    const average = (score15 && score1tiet) ? ((score15 + score1tiet) / 2).toFixed(2) : "";

    return (
      <tr key={index}>
        <td className="tg-wk8r">{index + 1}</td>
        <td className="tg-oe15">{student.name}</td>
        <td className="tg-oe15">{score15 === 0 ? '' : score15}</td> {/* Hiển thị rỗng nếu điểm là 0 */}
        <td className="tg-oe15">{score1tiet === 0 ? '' : score1tiet}</td> {/* Hiển thị rỗng nếu điểm là 0 */}
        <td className="tg-oe15">{average}</td>
      </tr>
    );
  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default LookUpStudents;
