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
            {/* <a href="#" className="category-item-name">
              Quy định
            </a> */}

            {/* MỚI THÊM */}
            <Link className="category-item-name" to={"/button"}>
              Quy định
            </Link>
            {/* MỚI THÊM */}
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Category;
