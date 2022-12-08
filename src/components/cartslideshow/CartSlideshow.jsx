import React from 'react';
import './cartslideshow_styles.css';
import LeftArrow from '../cartslideshowarrows/arrowleft.png'
import RightArrow from '../cartslideshowarrows/arrowright.png'

class CartSlideShow extends React.Component {
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
      <div className="cart-slideshow">
        <img src={this.props.gallery[this.state.currentImage]} alt={this.state.currentImage+"img of gallery"}></img>
        <div id={-1} onClick={this.changeCurrentImage} className={this.props.gallery.length === 1 ? 'none' : 'cart-direction-button cart-previous'}><img src={LeftArrow} alt="left arrow"/></div>
        <div id={1} onClick={this.changeCurrentImage} className={this.props.gallery.length === 1 ? 'none' : 'cart-direction-button cart-next'}><img src={RightArrow} alt="right arrow"/></div>
      </div>
    )

  }
}

export default CartSlideShow;