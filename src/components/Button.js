import "../css/form.css";
import "../css/function-list.css";
import "../css/global.css";
import "../css/intro.css";
import "../css/main.css";
import "../css/variable.css";
import "../css/subjectReport.css";
import "../css/button.css";

import React, { useState } from "react";
import { useEffect } from 'react';
import { db, doc, setDoc,getDocs,getDoc, collection,deleteDoc, updateDoc, deleteField } from "../firebaseConfig";


const Button = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showAgeInputs, setShowAgeInputs] = useState(false);
  const [showClassSizeInput, setShowClassSizeInput] = useState(false); 
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [classSize, setClassSize] = useState("");

  const [classList, setClassList] = useState([]);
  const [showClassList, setShowClassList] = useState(false);
  const [showClassActions, setShowClassActions] = useState(false);
  const [classNameToDelete, setClassNameToDelete] = useState("");
  const [classNameToAdd, setClassNameToAdd] = useState("");

  const [subjectList, setSubjectList] = useState([]);
const [showSubjectList, setShowSubjectList] = useState(false);
const [subjectToDelete, setSubjectToDelete] = useState("");
  const [subjectToAdd, setSubjectToAdd] = useState("");

  const [showPassingScoreInput, setShowPassingScoreInput] = useState(false);
  const [passingScore, setPassingScore] = useState("");

  const handlePassingScoreChange = async () => {
    try {
      // Input validation
      const newPassingScore = parseFloat(passingScore); // Chuyển đổi thành số
      if (isNaN(newPassingScore) || newPassingScore < 0 || newPassingScore > 10) {
        alert("Vui lòng nhập điểm đạt hợp lệ (từ 0 đến 10).");
        return;
      }

      const quydinhRef = doc(db, "qlhs", "quydinh");
      await updateDoc(quydinhRef, { diemdat: newPassingScore });
      alert("Đã thay đổi điểm đạt thành công!");
    } catch (error) {
      console.error("Lỗi khi thay đổi điểm đạt:", error);
      alert("Lỗi khi thay đổi điểm đạt.");
    }
  };

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const danhsachlopRef = collection(db, "qlhs", "danhsachlop", "danhsachlop");
        const querySnapshot = await getDocs(danhsachlopRef);
        const classListData = querySnapshot.docs.map(doc => doc.id); 
        setClassList(classListData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lớp:", error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    };
 
    fetchClassList();
    fetchSubjectList();
  }, []); // Chỉ chạy lại useEffect khi component mount lần đầu

  const fetchSubjectList = async () => {
    try {
      const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc"); // Lấy reference đến document chứ không phải collection
      const docSnapshot = await getDoc(danhsachmonhocRef); // Lấy dữ liệu của document
  
      if (docSnapshot.exists()) {
        const subjectData = docSnapshot.data();
        const subjectValues = Object.values(subjectData); // Lấy các giá trị (value) của các field
        setSubjectList(subjectValues);
      } else {
        setSubjectList([]); // Nếu không có document, đặt subjectList là mảng rỗng
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách môn học:", error);
      // Xử lý lỗi ở đây
    }
  };

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setShowAgeInputs(buttonIndex === 1);
    setShowClassSizeInput(buttonIndex === 2);
    setShowClassList(buttonIndex === 3);
    setShowClassActions(buttonIndex === 3);
    setShowSubjectList(buttonIndex === 4);
    setShowPassingScoreInput(buttonIndex === 5);
  };

  const handleSearch = async () => {
    if (activeButton === 1) { // Xử lý khi button "Thay đổi độ tuổi" được nhấn
      const currentYear = new Date().getFullYear();

      // Input validation cho độ tuổi
      if (!Number.isInteger(Number(minAge)) || !Number.isInteger(Number(maxAge))) {
        alert("Vui lòng nhập số nguyên cho độ tuổi.");
        return;
      }

      if (Number(minAge) >= Number(maxAge)) {
        alert("Tuổi tối thiểu phải nhỏ hơn tuổi tối đa.");
        return;
      }

      try {
        const quydinhRef = doc(db, "qlhs", "quydinh");
        await setDoc(quydinhRef, {
          minAge: currentYear - Number(minAge),
          maxAge: currentYear - Number(maxAge),
        });
        console.log("Lưu thành công!");
        alert("Đã thay đổi tuổi thành công!");
      } catch (error) {
        console.error("Lỗi khi lưu:", error);
      }
    } else if (activeButton === 2) { // Xử lý khi button "Thay đổi sĩ số" được nhấn
      // Input validation cho sĩ số
      if (!Number.isInteger(Number(classSize))) {
        alert("Vui lòng nhập số nguyên cho sĩ số lớp.");
        return;
      }

      try {
        const quydinhRef = doc(db, "qlhs", "quydinh");
        await setDoc(quydinhRef, { siso: Number(classSize) }, { merge: true });
        console.log("Lưu sĩ số thành công!");
        alert("Đã thay đổi sĩ số thành công!");
      } catch (error) {
        console.error("Lỗi khi lưu sĩ số:", error);
      }
    }
};

const handleClassActions = async (action) => {
  const danhsachlopCollectionRef = collection(db, "qlhs", "danhsachlop", "danhsachlop"); // Reference đến collection "danhsachlop"

  try {
    if (action === "delete") {
      if (!classNameToDelete) {
        alert("Vui lòng nhập tên lớp muốn xóa.");
        return;
      }

      const classRef = doc(danhsachlopCollectionRef, classNameToDelete); // Reference đến document của lớp


      // Xóa document của lớp
      await deleteDoc(classRef); 
    } else if (action === "add") {
      if (!classNameToAdd) {
        alert("Vui lòng nhập tên lớp muốn thêm.");
        return;
      }

      const classRef = doc(danhsachlopCollectionRef, classNameToAdd); // Reference đến document của lớp
      await setDoc(classRef, {});
      const danhsachClassRef = collection(classRef, `danhsach${classNameToAdd}`);
      await setDoc(doc(danhsachClassRef, "placeholder"), {}); // Tạo document placeholder (có thể thay bằng dữ liệu thực)
      setClassList([...classList, classNameToAdd]);

    }

    // Cập nhật lại danh sách lớp sau khi thực hiện thao tác
    const querySnapshot = await getDocs(danhsachlopCollectionRef);
    const classListData = querySnapshot.docs.map(doc => doc.id);
    setClassList(classListData);

    // Reset các input field sau khi thực hiện thao tác
    setClassNameToDelete("");
    setClassNameToAdd("");

    alert(`Thao tác ${action} lớp thành công!`);
  } catch (error) {
    console.error(`Lỗi khi ${action} lớp:`, error);
    alert(`Lỗi khi ${action} lớp.`);
  }
};

// Thêm xóa, môn học
const handleSubjectActions = async (action) => {
  const danhsachmonhocRef = doc(db, "qlhs", "danhsachmonhoc");

  try {
    if (action === "delete") {
      if (!subjectToDelete) {
        alert("Vui lòng nhập tên môn học muốn xóa.");
        return;
      }

      const docSnapshot = await getDoc(danhsachmonhocRef);
      if (docSnapshot.exists()) {
        const subjectData = docSnapshot.data();
        const fieldToDelete = Object.keys(subjectData).find(
          key => subjectData[key] === subjectToDelete
        );
        if (fieldToDelete) {
          // Xóa field khỏi document
          await updateDoc(danhsachmonhocRef, { [fieldToDelete]: deleteField() });
          alert(`Đã xóa môn học ${subjectToDelete}`);
        } else {
          alert(`Không tìm thấy môn học ${subjectToDelete}`);
        }
      }
    } else if (action === "add") {
      if (!subjectToAdd) {
        alert("Vui lòng nhập tên môn học muốn thêm.");
        return;
      }

      const newField = subjectToAdd
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase()
      .replace(/đ/g, "d"); 



      // Thêm field mới vào document
      await updateDoc(danhsachmonhocRef, { [newField]: subjectToAdd });
      alert(`Đã thêm môn học ${subjectToAdd}`);
    }

    // Cập nhật lại danh sách môn học sau khi thực hiện thao tác
    fetchSubjectList(); 
  } catch (error) {
    console.error(`Lỗi khi ${action} môn học:`, error);
    alert(`Lỗi khi ${action} môn học.`);
  }
};



  return (
    <div className="btn-container">
      <div className="btn-list">
        <button
          onClick={() => handleClick(1)}
          className={`btn btn-blue btn-choose ${activeButton === 1 ? "active" : ""}`}
        >
          Thay đổi độ tuổi
        </button>
        <button
          onClick={() => handleClick(2)}
          className={`btn btn-blue btn-choose ${activeButton === 2 ? "active" : ""}`}
        >
          Thay đổi sĩ số tối đa của 1 lớp
        </button>
        <button
          onClick={() => handleClick(3)}
          className={`btn btn-blue btn-choose ${activeButton === 3 ? "active" : ""}`}
        >
          Thay đổi số lượng lớp, thêm, xóa
        </button>
        <button
          onClick={() => handleClick(4)}
          className={`btn btn-blue btn-choose ${activeButton === 4 ? "active" : ""}`}
        >
          Thêm, xóa các môn học
        </button>
        <button
          onClick={() => handleClick(5)}
          className={`btn btn-blue btn-choose ${activeButton === 5 ? "active" : ""}`}
        >
          Thay đổi điểm cần đạt môn
        </button>
      </div>

      {showPassingScoreInput && (
        <div className="form-input-item-half">
          <label htmlFor="passingScore">Điểm đạt:</label>
          <input
            type="number"
            id="passingScore"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
          />
          <button className="btn btn-blue" onClick={handlePassingScoreChange}>
            Xác nhận
          </button>
        </div>
      )}

      {showAgeInputs && ( // Hiển thị vùng nhập độ tuổi khi activeButton === 1
        <div className="age-inputs-container">
          <div className="form-input-item-half">
            <label htmlFor="minAge">Tuổi tối thiểu:</label>
            <input
              type="number"
              id="minAge"
              name="minAge"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </div>
          <div className="form-input-item-half">
            <label htmlFor="maxAge">Tuổi tối đa:</label>
            <input
              type="number"
              id="maxAge"
              name="maxAge"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-blue" onClick={handleSearch}>
              Xác nhận
            </button>
          </div>
        </div>
      )}

{showClassSizeInput && (
        <div className="form-input-item-half">
          <label htmlFor="classSize">Sĩ số tối đa:</label>
          <input
            type="number"
            id="classSize"
            name="classSize"
            value={classSize}
            onChange={(e) => setClassSize(e.target.value)}
          />
          <button className="btn btn-blue" onClick={handleSearch}>
            Xác nhận
          </button>
        </div>
      )}

{showClassActions && (
        <div className="class-actions-container">
          <div className="form-input-item-half">
            <label htmlFor="classNameToDelete">Xóa lớp:</label>
            <input
              type="text"
              id="classNameToDelete"
              value={classNameToDelete}
              onChange={(e) => setClassNameToDelete(e.target.value)}
            />
            <button className="btn btn-red" onClick={() => handleClassActions("delete")}>Xóa</button>
          </div>
          
          <div className="form-input-item-half">
            <label htmlFor="classNameToAdd">Thêm lớp:</label>
            <input
              type="text"
              id="classNameToAdd"
              value={classNameToAdd}
              onChange={(e) => setClassNameToAdd(e.target.value)}
            />
            <button className="btn btn-green" onClick={() => handleClassActions("add")}>Thêm</button>
          </div>

          
        </div>
      )}

{showClassList && (
  <div className="class-list-container">
    <h2 style={{ fontSize: '20px' }}>Danh sách lớp:</h2>
    <ul style={{ fontSize: '20px' }}>
      {classList.map((className) => (
        <li key={className}>{className}</li>
      ))}
    </ul>
  </div>
)}

{showSubjectList && (
  <div className="subject-list-container">
    <h2 style={{ fontSize: '20px' }}>Danh sách môn học:</h2>
    <ul style={{ fontSize: '20px' }}>
      {subjectList.map((subjectName, index) => (
        <li key={index}>{subjectName}</li>
      ))}
    </ul>
  </div>
)}

{showSubjectList && (
        <div className="subject-list-container">
          {/* ... (hiển thị danh sách môn học) */}

          <div className="subject-actions-container">
            <div className="form-input-item-half">
              <label htmlFor="subjectToDelete">Xóa môn học:</label>
              <input
                type="text"
                id="subjectToDelete"
                value={subjectToDelete}
                onChange={(e) => setSubjectToDelete(e.target.value)}
              />
              <button className="btn btn-red" onClick={() => handleSubjectActions("delete")}>Xóa</button>
            </div>
            <div className="form-input-item-half">
              <label htmlFor="subjectToAdd">Thêm môn học:</label>
              <input
                type="text"
                id="subjectToAdd"
                value={subjectToAdd}
                onChange={(e) => setSubjectToAdd(e.target.value)}
              />
              <button className="btn btn-green" onClick={() => handleSubjectActions("add")}>Thêm</button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

export default Button;
