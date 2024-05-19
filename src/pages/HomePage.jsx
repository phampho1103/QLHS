import Category from "../components/Category";
import SubjectReport from "../components/SubjectReport";
import SubjectScore from "../components/SubjectScore";
import SemesterReport from "../components/SemesterReport";
import NavBar from "../components/NavBar";
import CategoryReport from "../components/CategoryReport";
import AccessStudent from "../components/AccessStudent";
import CreateListClass from "../components/CreateListClass";
import LookUpStudents from "../components/LookUpStudents";
import { Routes, Route } from "react-router-dom";
import "../css/main.css";
const HomePage = () => {
  return (
    <div className="main">
      <Category />
      <div className="content">
        <NavBar />
        <div className="content-body">
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
