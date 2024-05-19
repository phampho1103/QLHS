import "../css/createListClass.css";
import { useState } from "react";
function CreateListClass() {
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (className, classSize) => {
    setSelectedClass({ className, classSize });
  };
  return (
    <div className="createListClass">
      <div className="class-list">
        <h3>DANH SÁCH CÁC LỚP</h3>
        <div className="list-btn">
          <button
            onClick={() => {
              handleClassClick("10A1", 20);
            }}
          >
            10A1
          </button>
          <button onClick={() => handleClassClick("10A2", 30)}>10A2</button>
          <button
            onClick={() => {
              handleClassClick("10A3", 40);
            }}
          >
            10A3
          </button>
          <button
            onClick={() => {
              handleClassClick("10A4", 34);
            }}
          >
            10A4
          </button>
          <button
            onClick={() => {
              handleClassClick("11A1", 30);
            }}
          >
            11A1
          </button>
          <button
            onClick={() => {
              handleClassClick("11A2", 20);
            }}
          >
            11A2
          </button>
          <button onClick={() => handleClassClick("12A1", 20)}>11A3</button>
          <button
            onClick={() => {
              handleClassClick("10A1", 20);
            }}
          >
            12A1
          </button>
          <button
            onClick={() => {
              handleClassClick("12A2", 30);
            }}
          >
            12A2
          </button>
        </div>
      </div>
      {selectedClass && (
        <div>
          <div className="display-class-list">
            <h3>DANH SÁCH LỚP</h3>
            <div className="class-name-size">
              <div className="class-name">
                <label for="class">Lớp:</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={selectedClass.className}
                  readOnly
                />
              </div>
              <div className="class-size">
                <label for="class-size">Sỉ số:</label>
                <input
                  type="text"
                  id="class-size"
                  name="class-size"
                  value={selectedClass.classSize}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div>
            <table
              className="tg table"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="tg-b0es">STT</th>
                  <th className="tg-b0es">Họ và tên</th>
                  <th className="tg-b0es">Giới tính</th>
                  <th className="tg-b0es">Năm sinh</th>
                  <th className="tg-b0es">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyễn Văn Hoành</td>
                  <td className="tg-oe15"> Nam</td>
                  <td className="tg-oe15">2002</td>
                  <td className="tg-oe15">QN</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyễn Văn Hoành</td>
                  <td className="tg-oe15"> Nam</td>
                  <td className="tg-oe15">2002</td>
                  <td className="tg-oe15">QN</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyễn Văn Hoành</td>
                  <td className="tg-oe15"> Nam</td>
                  <td className="tg-oe15">2002</td>
                  <td className="tg-oe15">QN</td>
                </tr>
                <tr>
                  <td className="tg-wk8r">1</td>
                  <td className="tg-oe15">Nguyễn Văn Hoành</td>
                  <td className="tg-oe15"> Nam</td>
                  <td className="tg-oe15">2002</td>
                  <td className="tg-oe15">QN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
export default CreateListClass;
