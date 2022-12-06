import React from 'react';
import './slideshow_styles.css';
import {BiRightArrow} from 'react-icons/bi'
import {BiLeftArrow} from 'react-icons/bi'
class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    }
    this.changeCurrentImage = this.changeCurrentImage.bind(this);
    this.changeOnClickCurrentImage = this.changeOnClickCurrentImage.bind(this);
  }
  changeCurrentImage(event) {
    const direction = parseInt(event.currentTarget.id)
    if(this.props.gallery.length-1 === this.state.currentImage && direction > 0) {
      this.setState({
        currentImage: 0
      })
    }
    else {
      if(this.state.currentImage+direction<0) {
        this.setState(prevState => ({
          currentImage: this.props.gallery.length-1
        }))
      }
      else {
        this.setState(prevState => ({
          currentImage: prevState.currentImage+direction
        }));
      }
    }
  }
  changeOnClickCurrentImage(event) {
    this.setState(({
      currentImage: parseInt(event.currentTarget.id)
    }))
  }
  render() {
    return (
      <div className="slideshow-container">
        <div className="side-images-container">
          {this.props.gallery.map(({image},id) =>(
            <img id={id} key={id} onClick={this.changeOnClickCurrentImage} src={this.props.gallery[id]} alt={id + "side image"} className={this.state.currentImage === id ? 'active side-image' : 'side-image'}></img>
          ))}
        </div>
        <div className="slideshow">
          <img src={this.props.gallery[this.state.currentImage]} alt={this.state.currentImage+"img of gallery"}></img>
          <div id={-1} onClick={this.changeCurrentImage} className={this.props.gallery.length === 1 ? 'none' : 'direction-button previous'}><BiLeftArrow/></div>
          <div id={1} onClick={this.changeCurrentImage} className={this.props.gallery.length === 1 ? 'none' : 'direction-button next'}><BiRightArrow/></div>
        </div>
      </div>
    )

  }
}

export default SlideShow;