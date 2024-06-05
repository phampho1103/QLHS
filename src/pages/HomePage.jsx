import Category from "../components/Category";
import SubjectReport from "../components/SubjectReport";
import SubjectScore from "../components/SubjectScore";
<<<<<<< HEAD
=======
import QuyDinh from "../components/QuyDinh";
>>>>>>> origin/master
import SemesterReport from "../components/SemesterReport";
import NavBar from "../components/NavBar";
import CategoryReport from "../components/CategoryReport";
import AccessStudent from "../components/AccessStudent";
import CreateListClass from "../components/CreateListClass";
import LookUpStudents from "../components/LookUpStudents";
import { Routes, Route } from "react-router-dom";
import "../css/main.css";
<<<<<<< HEAD
// mới thêm
import Button from "../components/Button";
//
=======
>>>>>>> origin/master
const HomePage = () => {
  return (
    <div className="main">
      <Category />
<<<<<<< HEAD
      <div className="content">
        <NavBar />
        <div className="content-body">
          {/* MỚI THÊM */}
          <Routes>
            <Route path="/button" element={<Button />} />
          </Routes>
          {/*  */}
=======

      <Routes>
            <Route path="/quy-dinh" element={<QuyDinh />} />
          </Routes>

      <div className="content">
        <NavBar />
        
        <div className="content-body">
          
>>>>>>> origin/master
          <Routes>
            <Route path="/look-up-student" element={<LookUpStudents />} />
          </Routes>
          <Routes>
            <Route path="/create-list-class" element={<CreateListClass />} />
          </Routes>
          <Routes>
            <Route path="/access-student" element={<AccessStudent />} />
          </Routes>
          <Routes>
            <Route path="/subject-report" element={<SubjectReport />} />
          </Routes>
          <Routes>
            <Route path="/semester-report" element={<SemesterReport />} />
          </Routes>
          <Routes>
            <Route path="/subject-score" element={<SubjectScore />} />
          </Routes>
          <Routes>
            <Route path="/category-report" element={<CategoryReport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
