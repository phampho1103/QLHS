import '../css/form.css'
import '../css/function-list.css'
import '../css/global.css'
import '../css/intro.css'
import '../css/main.css'
import '../css/variable.css'
import '../css/subjectReport.css'


const SubjectReport = () => {
  return (
    <>
      <form method="POST" action="" className="form">
        <div className="form-wrap">
          <div className="form-title">BẢNG ĐIỂM</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
              <label htmlFor="type">Lớp</label>
              <select id="type" name="TenLop">
                <option defaultValue="" disabled>Chọn lớp</option>
                <option value="12A1">12A1</option>
                <option value="12A2">12A2</option>
                <option value="12A3">12A3</option>
                <option value="12A4">12A4</option>
                <option value="12A5">12A5</option>
              </select>
            </div>
            <div className="form-input-item-half">
              <label htmlFor="type">Học kỳ</label>
              <select id="type" name="HocKy">
                <option defaultValue="" disabled>Chọn học kỳ</option>
                <option value="hk1">HK I</option>
                <option value="hk2">HK II</option>
              </select>
            </div>
          </div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
              <label htmlFor="type">Môn học</label>
              <select id="type" name="MonHoc">
                <option defaultValue="" disabled>Chọn môn</option>
                <option value="toan}">Toán</option>
                <option value="ly">Lý</option>
                <option value="hoa">Hóa</option>
                <option value="sinh">Sinh</option>
                <option value="anh">Anh</option>
                <option value="van">Văn</option>
              </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
          <div className="btn-group">
            <button className="btn btn-blue" id="btn-add" type="submit">Tìm kiếm</button>
          </div>
        </div>
      </form>
      <div className="result">
        <div className="result-title">DANH SÁCH HỌC SINH</div>
        <div className="result-table">
          <table className="tg" style={{tableLayout: 'fixed', width: '100%'}}>
            <colgroup>
              <col style={{width: '5%'}} />
              <col style={{width: '25%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '20%'}} />
            </colgroup>
            <thead>
              <tr>
                <th className="tg-b0es">STT</th>
                <th className="tg-b0es">Họ và Tên</th>
                <th className="tg-b0es">Diểm 15'</th>
                <th className="tg-b0es">Điểm 1 tiết</th>
                <th className="tg-b0es">Điểm thi</th>
                <th className="tg-b0es">Điểm trung bình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tg-wk8r">1</td>
                <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                <td className="tg-oe15">8</td>
                <td className="tg-oe15">9</td>
                <td className="tg-oe15">10</td>
                <td className="tg-oe15">{(8+9*2+10*3)/6}</td>
              </tr> 
              <tr>
                <td className="tg-wk8r">1</td>
                <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                <td className="tg-oe15">8</td>
                <td className="tg-oe15">9</td>
                <td className="tg-oe15">10</td>
                <td className="tg-oe15">{(8+9*2+10*3)/6}</td>
              </tr> 
              <tr>
                <td className="tg-wk8r">1</td>
                <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                <td className="tg-oe15">8</td>
                <td className="tg-oe15">9</td>
                <td className="tg-oe15">10</td>
                <td className="tg-oe15">{(8+9*2+10*3)/6}</td>
              </tr> 
              <tr>
                <td className="tg-wk8r">1</td>
                <td className="tg-oe15">Nguyen Ngoc Sinh</td>
                <td className="tg-oe15">8</td>
                <td className="tg-oe15">9</td>
                <td className="tg-oe15">10</td>
                <td className="tg-oe15">{(8+9*2+10*3)/6}</td>
              </tr>         
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SubjectReport