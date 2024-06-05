<<<<<<< HEAD
import '../css/form.css'
import '../css/function-list.css'
import '../css/global.css'
import '../css/intro.css'
import '../css/main.css'
import '../css/variable.css'
import '../css/subjectReport.css'
import "../css/form.css";


import { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc,getDoc } from "../firebaseConfig";

const SemesterReport = () => {
  const [semester, setSemester] = useState("hk1"); // Giá trị mặc định là "hk1"
  const [reportData, setReportData] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [passingScore, setPassingScore] = useState(null);


 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách môn học
        const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc");
        const docSnapshot = await getDoc(danhsachmonhocRef);
        const subjects = docSnapshot.exists() ? Object.keys(docSnapshot.data()) : [];
  
        // Lấy điểm chuẩn
        const quydinhRef = doc(db, "qlhs", "quydinh");
        const quydinhSnapshot = await getDoc(quydinhRef);
        const diemDat = quydinhSnapshot.exists() ? quydinhSnapshot.data().diemdat : 5;
  
        setSubjectList(subjects);
        setPassingScore(diemDat);
  
        // Nếu đã lấy được điểm chuẩn, mới thực hiện tính toán báo cáo
        if (diemDat !== null) {
          fetchSemesterReport(subjects, diemDat); // Truyền vào subjectList và passingScore
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Lỗi khi lấy dữ liệu: " + error.message);
      }
    };
  
    fetchData();
  }, [semester,passingScore]);

  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setSemester(formData.get("semester"));
  };

  const fetchSemesterReport = async () => {
    try {
      const classListRef = collection(db, "qlhs", "danhsachlop", "danhsachlop");
      const classListSnapshot = await getDocs(classListRef);
      const report = [];

      // Lấy danh sách môn học từ Firebase
      const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc");
      const docSnapshot = await getDoc(danhsachmonhocRef);
      const subjectList = docSnapshot.exists() ? Object.keys(docSnapshot.data()) : [];

      for (const classDoc of classListSnapshot.docs) {
        const className = classDoc.id;
        const classStudentsCollectionRef = collection(db, "qlhs", "danhsachlop", "danhsachlop", className, `danhsach${className}`);
        const studentsSnapshot = await getDocs(classStudentsCollectionRef);
        const updatedStudents = await Promise.all(
          studentsSnapshot.docs.map(async (studentDoc) => { 
            const studentData = studentDoc.data();
            let totalScore = 0;
            let validSubjects = 0;

            for (const subject of subjectList) {
              const score = studentData[`${subject}_tb_${semester}`];
              if (typeof score === "number" && !isNaN(score)) {
                totalScore += score;
                validSubjects++;
              }
            }
            
            const averageScore = validSubjects > 0 ? totalScore / validSubjects : 0;

            // Cập nhật điểm trung bình của học sinh
            const studentRef = doc(classStudentsCollectionRef, studentDoc.id); // <-- Sửa lại studentDocRef
            await updateDoc(studentRef, { [`tbhk_${semester}`]: averageScore });

            return { ...studentData, [`tbhk_${semester}`]: averageScore };
          })
        );
  
        // Tính toán số lượng đạt và tỉ lệ đạt
        const totalStudents = updatedStudents.length;
        const passedStudents = updatedStudents.filter(student => student[`tbhk_${semester}`] >= passingScore).length;
        const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) : 0;

        report.push({
          className,
          totalStudents,
          passedStudents,
          passRate,
        });
      }

      setReportData(report);
    } catch (error) {
      console.error("Lỗi khi tạo báo cáo tổng kết học kỳ:", error);
      alert("Lỗi khi tạo báo cáo tổng kết học kỳ: " + error.message);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-wrap">
          <div className="form-title">BÁO CÁO TỔNG KẾT HỌC KỲ</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
            <label htmlFor="semester">Học kỳ</label>
            <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="hk1">HK I</option>
              <option value="hk2">HK II</option>
            </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
          <div className="btn-group">
            <button className="btn btn-blue" id="btn-add" type="submit">Thống kê</button>
          </div>
        </div>
      </form>
      {reportData.length > 0 && ( // Kiểm tra xem có dữ liệu báo cáo không
        <div className="result">
          <div className="result-title">BÁO CÁO TỔNG KẾT HỌC KỲ {semester}</div>
          <p className="passing-score-info">Điểm chuẩn: {passingScore}</p>
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
      )}
    </>
  );
};


=======
import '../css/form.css'
import '../css/function-list.css'
import '../css/global.css'
import '../css/intro.css'
import '../css/main.css'
import '../css/variable.css'
import '../css/subjectReport.css'
import "../css/form.css";


import { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc } from "../firebaseConfig";

const SemesterReport = () => {
  const [semester, setSemester] = useState("hk1"); // Giá trị mặc định là "hk1"
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (semester) {
      fetchSemesterReport();
    }
  }, [semester]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setSemester(formData.get("semester"));
  };

  const fetchSemesterReport = async () => {
    const classListRef = collection(db, `qlhs/danhsachlop/danhsachlop`);
    const classListSnapshot = await getDocs(classListRef);
    const report = [];
    const subjects = ["toan", "ly", "hoa", "sinh", "su", "dia", "van", "daoduc", "theduc"];

    for (const classDoc of classListSnapshot.docs) {
      const className = classDoc.id;
      const classRef = collection(classListRef, className, `danhsach${className}`);
      const snapshot = await getDocs(classRef);
      const students = snapshot.docs.map((doc) => doc.data());

      // Tính và lưu điểm trung bình học kỳ cho từng học sinh
      await Promise.all(
        students.map(async (student) => {
          if (student.id) {
            const studentDocRef = doc(db, `qlhs/danhsachlop/danhsachlop/${className}/danhsach${className}`, student.id);
            let totalScore = 0;
            let validSubjects = 0;

            for (const subject of subjects) {
              const score = student[`${subject}_tb_${semester}`];
              if (typeof score === "number" && !isNaN(score)) {
                totalScore += score;
                validSubjects++;
              }
            }

            const averageScore = validSubjects > 0 ? totalScore / subjects.length : 0;
            await updateDoc(studentDocRef, { [`tbhk_${semester}`]: averageScore }); // Lưu điểm trung bình vào Firestore
          }
        })
      );

      // Lấy lại danh sách học sinh sau khi đã cập nhật điểm trung bình
      const updatedSnapshot = await getDocs(classRef);
      const updatedStudents = updatedSnapshot.docs.map((doc) => doc.data());

      // Tính toán số lượng đạt và tỉ lệ đạt
      const totalStudents = updatedStudents.length;
      const passedStudents = updatedStudents.filter(student => student[`tbhk_${semester}`] >= 5).length;
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

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-wrap">
          <div className="form-title">BÁO CÁO TỔNG KẾT HỌC KỲ</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
            <label htmlFor="semester">Học kỳ</label>
            <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="hk1">HK I</option>
              <option value="hk2">HK II</option>
            </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
          <div className="btn-group">
            <button className="btn btn-blue" id="btn-add" type="submit">Thống kê</button>
          </div>
        </div>
      </form>
      {reportData.length > 0 && ( // Kiểm tra xem có dữ liệu báo cáo không
        <div className="result">
          <div className="result-title">BÁO CÁO TỔNG KẾT HỌC KỲ {semester}</div>
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
      )}
    </>
  );
};


>>>>>>> origin/master
export default SemesterReport;