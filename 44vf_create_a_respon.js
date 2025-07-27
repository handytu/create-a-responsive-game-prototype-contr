// Game Prototype Controller API Specification

class GameController {
  constructor(canvasElement, playerElement) {
    this.canvas = canvasElement;
    this.player = playerElement;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeDirection = null;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.isMobile) {
      this.canvas.addEventListener('touchstart', (e) => {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      });

      this.canvas.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;
        this.calculateSwipeDirection();
      });
    } else {
      this.canvas.addEventListener('mousedown', (e) => {
        this.touchStartX = e.clientX;
        this.touchStartY = e.clientY;
      });

      this.canvas.addEventListener('mouseup', (e) => {
        this.touchEndX = e.clientX;
        this.touchEndY = e.clientY;
        this.calculateSwipeDirection();
      });
    }
  }

  calculateSwipeDirection() {
    let swipeHorizontal = Math.abs(this.touchEndX - this.touchStartX);
    let swipeVertical = Math.abs(this.touchEndY - this.touchStartY);

    if (swipeHorizontal > swipeVertical) {
      if (this.touchEndX > this.touchStartX) {
        this.swipeDirection = 'right';
      } else {
        this.swipeDirection = 'left';
      }
    } else {
      if (this.touchEndY > this.touchStartY) {
        this.swipeDirection = 'down';
      } else {
        this.swipeDirection = 'up';
      }
    }

    this.dispatchSwipeEvent();
  }

  dispatchSwipeEvent() {
    let swipeEvent = new CustomEvent('swipe', {
      detail: {
        direction: this.swipeDirection
      }
    });

    this.player.dispatchEvent(swipeEvent);
  }
}

export default GameController;