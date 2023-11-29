// Write your code here.
import './index.css'

const CardItem = props => {
  const {blogDetails} = props
  const {title, username, postID} = blogDetails

  return (
    <li className={`blog-li-container card-${postID}`}>
      <div className="blog-li-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/data-scientist-img.png"
          alt="profile"
          className="blog-li-img"
        />
        <h1 className="blog-li-username">Author : {username}</h1>
      </div>
      <h1 className="blog-li-title">{title}</h1>
      <button className="blog-li-button" type="button">
        View Post
      </button>
    </li>
  )
}

export default CardItem
