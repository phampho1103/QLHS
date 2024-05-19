import "../css/LookUpStudents.css";
import { useState } from "react";

function LookUpStudents() {
  const [fullName, setFullName] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [block, setBlock] = useState("");
  const [searchStudent, setSearchStudent] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearch = () => {
    setIsSearchClicked(true);
    if (fullName === "" && classRoom === "" && block === "") {
      setSearchStudent(null);
    } else {
      setSearchStudent({ fullName, classRoom, block });
    }
  };

  return (
    <div className="lookUpStudents">
      <table
        className="table tg"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="tg-b0es"> STT</th>
            <th className="tg-b0es">Họ và tên</th>
            <th className="tg-b0es">Lớp</th>
            <th className="tg-b0es">Khối</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-wk8r">1</td>
            <td className="tg-oe15">Nguyễn Văn Hoành</td>
            <td className="tg-oe15">10</td>
            <td className="tg-oe15">10</td>
          </tr>
          <tr>
            <td className="tg-wk8r">1</td>
            <td className="tg-oe15">Nguyễn Văn Hoành</td>
            <td className="tg-oe15">10</td>
            <td className="tg-oe15">10</td>
          </tr>
          <tr>
            <td className="tg-wk8r">1</td>
            <td className="tg-oe15">Nguyễn Văn Hoành</td>
            <td className="tg-oe15">10</td>
            <td className="tg-oe15">10</td>
          </tr>
          <tr>
            <td className="tg-wk8r">1</td>
            <td className="tg-oe15">Nguyễn Văn Hoành</td>
            <td className="tg-oe15">10</td>
            <td className="tg-oe15">10</td>
          </tr>
        </tbody>
      </table>
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
        <div className="form-input-item-half">
          <label htmlFor="block">Khối:</label>
          <input
            type="text"
            id="block"
            name="block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
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
                  <tr>
                    <td className="tg-wk8r">1</td>
                    <td className="tg-oe15">{searchStudent.fullName}</td>
                    <td className="tg-oe15">{searchStudent.classRoom}</td>
                    <td className="tg-oe15">9</td>
                    <td className="tg-oe15">9</td>
                  </tr>
                  <tr>
                    <td className="tg-wk8r">1</td>
                    <td className="tg-oe15">{searchStudent.fullName}</td>
                    <td className="tg-oe15">{searchStudent.classRoom}</td>
                    <td className="tg-oe15">9</td>
                    <td className="tg-oe15">9</td>
                  </tr>
                  <tr>
                    <td className="tg-wk8r">1</td>
                    <td className="tg-oe15">{searchStudent.fullName}</td>
                    <td className="tg-oe15">{searchStudent.classRoom}</td>
                    <td className="tg-oe15">9</td>
                    <td className="tg-oe15">9</td>
                  </tr>
                  <tr>
                    <td className="tg-wk8r">1</td>
                    <td className="tg-oe15">{searchStudent.fullName}</td>
                    <td className="tg-oe15">{searchStudent.classRoom}</td>
                    <td className="tg-oe15">9</td>
                    <td className="tg-oe15">9</td>
                  </tr>
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
