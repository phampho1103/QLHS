import '../css/extend-btn.css'
import '../css/global.css'
import { useNavigate } from 'react-router-dom'
const CategoryReport = () => {
  const navigate = useNavigate()
  const handleBtn1 = () => {
    navigate('/subject-report')
  }

  const handleBtn2 = () => {
    navigate('/semester-report')
  }
  return (
    <div className="btn-center">
      <button class="btn btn-blue btn-choose" id="btn-add" type="button" onClick={handleBtn1}>Tổng kết môn học</button>
      <button class="btn btn-blue btn-choose" id="btn-add" type="button" onClick={handleBtn2}>Tổng kết học kỳ</button>
    </div>
  )
}

export default CategoryReport