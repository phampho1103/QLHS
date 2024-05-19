// import "../css/AccessStudent.css";

function AccessStudent() {
  return (
    <form method="POST" action="" className="form">
      <div className="form-wrap">
        <div className="form-title">
          <h3>Hồ sơ học sinh</h3>
        </div>
        <form className="form-input-group-half">
          <div className="form-input-item-half">
            <label for="name">Họ và tên</label>
            <input type="text" id="name" name="name"></input>
          </div>
          <div className="form-input-item-half">
            <label for="date-birth">Ngày sinh</label>
            <input type="date" id="date" name="date-birth"></input>
          </div>
          <div className="form-input-item-half">
            <label for="gender">Giới tính</label>
            <select id="gender" name="gender">
              <option value="male">Nam</option>
              <option value="fmale">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="form-input-item-half">
            <label for="address">Địa chỉ</label>
            <textarea id="address" name="address"></textarea>
          </div>
          <div className="form-input-item-half">
            <label for="email">Email</label>
            <input type="email" id="email" name="email"></input>
          </div>
        </form>
        <div className="btn-group">
          <button class="btn btn-blue " disabled id="btn-add" type="submit">
            THÊM
          </button>
        </div>
      </div>
    </form>
  );
}
export default AccessStudent;
