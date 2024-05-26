import "../css/category.css";
import avata from "../img/avata.jpg";
import logout from "../img/logout.png";
import { Link } from "react-router-dom";
const Category = () => {
  return (

    
    
    <div className="category">
      <div className="title">Quản lý học sinh</div>
      <div className="category-list">
        <ul className="category-list-item">
          <li className="category-item">
            <a href="#" className="category-item-name">
              Chức năng
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item-name">
            <Link to={"/quy-dinh"}>Quy Định</Link>
            </a>
          </li>
        </ul>
        <ul className="category-user">
          <li className="category-item">
            <img src={avata} alt="" style={{ borderRadius: "50%" }} />
            <a href="#" className="category-item-name">
              User
            </a>
          </li>
          <li className="category-item">
            <img srcSet={logout} alt="" />
            <a href="#" className="category-item-name">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>

    
  );
};

export default Category;
