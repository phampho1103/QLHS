import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebaseConfig'; // Import db, collection và addDoc từ firebaseConfig.js

function AccessStudent() {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    class: '',
    address: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'qlhs/hocsinh/danhsach'), studentInfo);
      console.log('Document written with ID: ', docRef.id);
      alert('Thêm học sinh thành công!');
      setStudentInfo({
        name: '',
        dateOfBirth: '',
        gender: '',
        class: '',
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
            <textarea id="address" name="address" value={studentInfo.address} onChange={handleChange}></textarea>
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

export default AccessStudent;
