import '../css/form.css'
import '../css/function-list.css'
import '../css/global.css'
import '../css/intro.css'
import '../css/main.css'
import '../css/variable.css'
import '../css/subjectReport.css'

const SemesterReport = () => {
  return (
    <>
      <form method="POST" action="" className="form">
        <div className="form-wrap">
          <div className="form-title">BÁO CÁO TỔNG KẾT HỌC KỲ</div>
          <div className="form-input-group-half">
            <div className="form-input-item-half">
              <label htmlFor="type">Học kỳ</label>
              <select id="type" name="MonHoc">
                <option defaultValue="" disabled>Chọn học kỳ</option>
                <option value="hk1">HK I</option>
                <option value="hk2">HK II</option>
              </select>
            </div>
          </div>
          <div className="text-error hidden"></div>
          <div className="text-success hidden"></div>
          <div className="btn-group">
            <button className="btn btn-blue" disabled id="btn-add" type="submit">Tìm kiếm</button>
          </div>
        </div>
      </form>
      <div className="result">
        <div className="result-title">BÁO CÁO TỔNG KẾT HỌC KỲ</div>
        <div className="result-table">
          <table className="tg" style={{tableLayout: 'fixed', width: '100%'}}>
            <colgroup>
              <col style={{width: '5%'}} />
              <col style={{width: '35%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '20%'}} />
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
              <tr>
                <td className="tg-wk8r">1</td>
                <td className="tg-oe15">12A1</td>
                <td className="tg-oe15">33</td>
                <td className="tg-oe15">44</td>
                <td className="tg-oe15">{33/44 + '%'}</td>
              </tr>
              <tr>
                <td className="tg-wk8r">2</td>
                <td className="tg-oe15">12A2</td>
                <td className="tg-oe15">33</td>
                <td className="tg-oe15">44</td>
                <td className="tg-oe15">{33/44 + '%'}</td>
              </tr>
              <tr>
                <td className="tg-wk8r">3</td>
                <td className="tg-oe15">12A3</td>
                <td className="tg-oe15">33</td>
                <td className="tg-oe15">44</td>
                <td className="tg-oe15">{33/44 + '%'}</td>
              </tr>
              <tr>
                <td className="tg-wk8r">4</td>
                <td className="tg-oe15">12A4</td>
                <td className="tg-oe15">33</td>
                <td className="tg-oe15">44</td>
                <td className="tg-oe15">{33/44 + '%'}</td>
              </tr>           
              <tr>
                <td className="tg-wk8r">5</td>
                <td className="tg-oe15">12A5</td>
                <td className="tg-oe15">33</td>
                <td className="tg-oe15">44</td>
                <td className="tg-oe15">{33/44 + '%'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SemesterReport