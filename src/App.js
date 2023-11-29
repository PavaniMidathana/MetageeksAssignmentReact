import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'
import CardItem from './components/CardItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    blogsData: [],
  }

  componentDidMount() {
    this.renderBlogsData()
  }

  renderBlogsData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const url = 'https://metageeksassignmentblogassignment.onrender.com/posts'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.map(each => ({
        content: each.Content,
        email: each.Email,
        postID: each.PostID,
        title: each.Title,
        username: each.Username,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        blogsData: updatedData,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <h1>Failure</h1>

  renderSuccessView = () => {
    const {blogsData} = this.state

    return (
      <ul className="blog-ul-container">
        {blogsData.map(each => (
          <CardItem blogDetails={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  renderCards = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div>
          <h1 className="heading">Posts</h1>
          {this.renderCards()}
        </div>
      </div>
    )
  }
}

export default App
