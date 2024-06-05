import "../css/form.css";
import "../css/function-list.css";
import "../css/global.css";
import "../css/intro.css";
import "../css/main.css";
import "../css/variable.css";
import "../css/subjectReport.css";

import { useState, useEffect } from "react";
import { db, collection, getDocs,doc,getDoc } from "../firebaseConfig";

const SubjectReport = () => {
  const [subject, setSubject] = useState("toan"); // Giá trị mặc định là "toán"
  const [semester, setSemester] = useState("hk1"); // Giá trị mặc định là "hk1"
  const [reportData, setReportData] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [passingScore, setPassingScore] = useState(5); // Mặc định là 5, sẽ được cập nhật từ Firebase


  useEffect(() => {
    const fetchSubjectList = async () => {
      try {
        const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc");
        const docSnapshot = await getDoc(danhsachmonhocRef);
  
        if (docSnapshot.exists()) {
          const subjectData = docSnapshot.data();
          const subjectValues = Object.keys(subjectData); // Lấy các key (tên field) làm danh sách môn học
          setSubjectList(subjectValues);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách môn học:", error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
      }
    };

  
    fetchSubjectList(); // Gọi hàm fetchSubjectList để lấy danh sách môn học
  }, []);

  useEffect(() => {
    if (subject && semester) {
      fetchSubjectReport();
    }
    const fetchPassingScore = async () => {
      try {
        const quydinhRef = doc(db, "qlhs", "quydinh");
        const docSnapshot = await getDoc(quydinhRef);

        if (docSnapshot.exists()) {
          setPassingScore(docSnapshot.data().diemdat || 5); // Lấy điểm đạt hoặc 5 nếu không có
        }
      } catch (error) {
        console.error("Lỗi khi lấy điểm đạt:", error);
      }
    };
    fetchPassingScore();
    fetchSubjectReport();

  }, [subject, semester]);

  const fetchSubjectReport = async () => {
    const classListRef = collection(db, `qlhs/danhsachlop/danhsachlop`); // Collection chứa danh sách lớp
    const classListSnapshot = await getDocs(classListRef);
    const report = [];

    for (const classDoc of classListSnapshot.docs) {
      const className = classDoc.id; // Lấy tên lớp từ ID của document
      const classRef = collection(db, `qlhs/danhsachlop/danhsachlop/${className}/danhsach${className}`);
      const snapshot = await getDocs(classRef);
      const students = snapshot.docs.map(doc => doc.data());

      const totalStudents = students.length;
      const passedStudents = students.filter(student => {
        const score = student[`${subject}_tb_${semester}`];
        return score !== undefined && score >= passingScore;
      }).length;

      const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) : 0;

      report.push({
        className,
        totalStudents,
        passedStudents,
        passRate,
      });
    }

    setReportData(report);
  };

   

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setSubject(formData.get("subject")); // Sửa tên trường
    setSemester(formData.get("semester")); // Sửa tên trường
  };

  return (
    <>
       <form className="form" onSubmit={handleFormSubmit}> {/* Xóa method và action */}
        <div className="form-wrap">
          <div className="form-title">BÁO CÁO TỔNG KẾT MÔN HỌC</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
            <label htmlFor="subject">Môn</label> {/* Sửa htmlFor */}
            <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}> {/* Sửa id, name và value */}
            <option value="" disabled>Chọn môn</option>
  {subjectList.map((subjectKey) => (
    <option key={subjectKey} value={subjectKey}>
      {subjectKey} 
    </option>
  ))}
              </select>
            </div>
          </div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
            <label htmlFor="semester">Học kỳ</label> {/* Sửa htmlFor */}
            <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}> {/* Sửa id, name và value */}
                <option defaultValue="" disabled>
                  Chọn học kỳ
                </option>
                <option value="hk1">HK I</option>
                <option value="hk2">HK II</option>
              </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
          <div className="btn-group">
            <button
              className="btn btn-blue"
              id="btn-add"
              type="submit"
            >
              THỐNG KÊ
            </button>
          </div>
        </div>
      </form>
      <div className="result">
        <div className="result-title">BÁO CÁO TỔNG KẾT MÔN</div>
        <div className="result-table">
          <table className="tg" style={{ tableLayout: "fixed", width: "100%" }}>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="tg-b0es">STT</th>
                <th className="tg-b0es">Lớp</th>
                <th className="tg-b0es">Sĩ số</th>
                <th className="tg-b0es">Số lượng đạt</th>
                <th className="tg-b0es">Tỉ lệ</th>
              </tr>
            </thead>
            <tbody>
          {reportData.map((classData, index) => (
            <tr key={index}>
              <td className="tg-wk8r">{index + 1}</td>
              <td className="tg-oe15">{classData.className}</td>
              <td className="tg-oe15">{classData.totalStudents}</td>
              <td className="tg-oe15">{classData.passedStudents}</td>
              <td className="tg-oe15">{classData.passRate}%</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SubjectReport;
