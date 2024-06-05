<<<<<<< HEAD

import React, { useState } from 'react';
import { useEffect } from 'react';
import { db,doc,getDoc, collection, addDoc,getDocs } from '../firebaseConfig'; // Import db, collection và addDoc từ firebaseConfig.js

function AccessStudent() {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'male', // Set default value for gender
    class: '10a1', // Set default value for class
    address: '',
    email: ''
  });

  const [minAge, setMinAge] = useState(0); // Initial state for minAge
  const [maxAge, setMaxAge] = useState(0); // Initial state for maxAge
  const [classList, setClassList] = useState([]); // Thêm state lưu danh sách lớp
  const [classCapacity, setClassCapacity] = useState(null); // State lưu trữ sĩ số tối đa



  // Function to fetch and set minAge and maxAge from Firestore
  const fetchAgeLimits = async () => {
    try {
      const docRef = doc(db, "qlhs", "quydinh"); // Use doc() instead of getDocs()
      const docSnap = await getDoc(docRef); // Use getDoc() for a single document
  
      if (docSnap.exists) {
        const data = docSnap.data();
        setMinAge(data.minAge);
        setMaxAge(data.maxAge);
      } else {
        console.error("Document 'quydinh' not found!");
      }
    } catch (error) {
      console.error("Error fetching age limits:", error);
    }
  };

  // Fetch age limits on component mount
  useEffect(() => {
    fetchAgeLimits(); // Call the function to fetch data
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {


    // Fetch danh sách lớp khi component mount
    const fetchClassList = async () => {
      try {
        const danhsachlopRef = collection(db, "qlhs", "danhsachlop", "danhsachlop");
        const querySnapshot = await getDocs(danhsachlopRef);
        const classListData = querySnapshot.docs.map(doc => doc.id); // Lấy tên lớp từ ID của document
        setClassList(classListData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lớp:", error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    };

    const fetchData = async () => {
      try {
        // ... (lấy danh sách lớp như cũ)

        // Lấy sĩ số tối đa
        const quydinhRef = doc(db, "qlhs", "quydinh");
        const docSnap = await getDoc(quydinhRef);
        if (docSnap.exists()) {
          setClassCapacity(docSnap.data().siso);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
    fetchClassList(); // Gọi hàm fetchClassList để lấy danh sách lớp
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== studentInfo[name]) { // Check for change before update
      setStudentInfo({
        ...studentInfo,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthYear = new Date(studentInfo.dateOfBirth).getFullYear();
const currentYear = 2024; // Assuming the current year is 2024
const calculatedAge = currentYear - birthYear;

if (birthYear <  maxAge || birthYear > minAge) {
  alert(`Tuổi phải nằm trong khoảng từ ${currentYear - minAge} đến ${currentYear - maxAge}`);
  return;
}

if (classCapacity !== null) { // Đảm bảo đã lấy được sĩ số tối đa
  const classCollectionRef = collection(
    db,
    `qlhs/danhsachlop/danhsachlop/${studentInfo.class}/danhsach${studentInfo.class}`
  );
  const snapshot = await getDocs(classCollectionRef);
  if (snapshot.size >= classCapacity) { // Nếu sĩ số hiện tại >= sĩ số tối đa
    alert(`Lớp ${studentInfo.class} đã đủ sĩ số!`);
    return;
  }
}

    try {
      const collectionPath = `/qlhs/danhsachlop/danhsachlop/${studentInfo.class}/danhsach${studentInfo.class}`; // Dynamic collection path based on class
      const docRef = await addDoc(collection(db, collectionPath), studentInfo);
      console.log('Document written with ID: ', docRef.id);
      alert('Thêm học sinh thành công!');
      setStudentInfo({
        name: '',
        dateOfBirth: '',
        gender: 'male', // Reset default values after submission
        class: '10a1', // Reset default value after submission
        address: '',
        email: ''
      });
    } catch (error) {
      console.error('Error adding student: ', error);
      alert('Đã xảy ra lỗi khi thêm học sinh: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-wrap">
        <div className="form-title">
          <h3>Hồ sơ học sinh</h3>
        </div>
        <div className="form-input-group-half">
          <div className="form-input-item-half">
            <label htmlFor="name">Họ và tên</label>
            <input type="text" id="name" name="name" value={studentInfo.name} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="date-birth">Ngày sinh</label>
            <input type="date" id="date" name="dateOfBirth" value={studentInfo.dateOfBirth} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="gender">Giới tính</label>
            <select id="gender" name="gender" value={studentInfo.gender} onChange={handleChange}>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="class">Lớp</label>
            <select id="class" name="class" value={studentInfo.class} onChange={handleChange}>
            <option value="" disabled>Chọn lớp</option>
            {classList.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
            </select>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="address">Địa chỉ</label>
            <input id="address" name="address" value={studentInfo.address} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={studentInfo.email} onChange={handleChange}></input>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-blue" type="submit">THÊM</button>
           </div>
           </div>
        </form>
 );
}

=======

import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebaseConfig'; // Import db, collection và addDoc từ firebaseConfig.js

function AccessStudent() {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'male', // Set default value for gender
    class: '10a1', // Set default value for class
    address: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== studentInfo[name]) { // Check for change before update
      setStudentInfo({
        ...studentInfo,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionPath = `/qlhs/danhsachlop/danhsachlop/${studentInfo.class}/danhsach${studentInfo.class}`; // Dynamic collection path based on class
      const docRef = await addDoc(collection(db, collectionPath), studentInfo);
      console.log('Document written with ID: ', docRef.id);
      alert('Thêm học sinh thành công!');
      setStudentInfo({
        name: '',
        dateOfBirth: '',
        gender: 'male', // Reset default values after submission
        class: '10a1', // Reset default value after submission
        address: '',
        email: ''
      });
    } catch (error) {
      console.error('Error adding student: ', error);
      alert('Đã xảy ra lỗi khi thêm học sinh: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-wrap">
        <div className="form-title">
          <h3>Hồ sơ học sinh</h3>
        </div>
        <div className="form-input-group-half">
          <div className="form-input-item-half">
            <label htmlFor="name">Họ và tên</label>
            <input type="text" id="name" name="name" value={studentInfo.name} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="date-birth">Ngày sinh</label>
            <input type="date" id="date" name="dateOfBirth" value={studentInfo.dateOfBirth} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="gender">Giới tính</label>
            <select id="gender" name="gender" value={studentInfo.gender} onChange={handleChange}>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="class">Lớp</label>
            <select id="class" name="class" value={studentInfo.class} onChange={handleChange}>
              <option value="10a1">10A1</option>
              <option value="10a2">10A2</option>
              <option value="10a3">10A3</option>
              <option value="10a4">10A4</option>
              <option value="11a1">11A1</option>
              <option value="11a2">11A2</option>
              <option value="11a3">11A3</option>
              <option value="12a1">12A1</option>
              <option value="12a2">12A2</option>
            </select>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="address">Địa chỉ</label>
            <input id="address" name="address" value={studentInfo.address} onChange={handleChange}></input>
          </div>
          <div className="form-input-item-half">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={studentInfo.email} onChange={handleChange}></input>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-blue" type="submit">THÊM</button>
           </div>
           </div>
        </form>
 );
}

>>>>>>> origin/master
export default AccessStudent;