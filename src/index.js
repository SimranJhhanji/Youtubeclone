import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      listOfVideos: [],
      loadStatus: null ,
      currentVideoUrl: '',
      comment: '',
      listOfComments: [],
      getLikeStatus: 'Like',
      loadError: false
    };
  }

getSearchValue=(event) =>{
this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)

}
searchVideo = async () => {
    this.setState({
    loadStatus: "LOADING",
    loadError: false
  })
  //automatically return promises and await
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    loadError: true
  })
}
this.setState({
  listOfVideos: myJson.items
})
console.log(this.state.listOfVideos)
  this.setState({
    loadStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadStatus: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  listOfVideos: myJson.items,
  loadStatus: "LOADED"
})
console.log(this.state.listOfVideos)
this.setState({
  currentVideoUrl: this.state.listOfVideos[0].id.videoId
})
console.log("currentVideoUrl" , this.state.currentVideoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("listOfVideos" , this.state.listOfVideos)
}
setCurrentUrl = (id) => {

  this.setState({
    currentVideoUrl: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    listOfComments: [...this.state.listOfComments, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.getLikeStatus == "Like"){
  this.setState({
    getLikeStatus: 'Liked'
  })
  } else {
      this.setState({
    getLikeStatus: 'Like'
  })
  }

}
  render() {
    let videos = this.state.listOfVideos.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height : '310px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"440px",width:"430px"}} placeholder="Search here..." onChange={this.getSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.loadError ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.currentVideoUrl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '290px', float : 'right'}}>
        {this.state.loadStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "780px" ,backgroundColor:" red",padding:'10px'}}onClick={this.likeButton}>{this.state.getLikeStatus}</button>
{this.state.listOfComments.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));