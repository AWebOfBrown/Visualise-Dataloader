import anime from "animejs";

export default class Animations {
  constructor(DOMNode) {
    this.DOMNode = DOMNode;
    this.timeline = null;
  }

  click = function(active) {
    anime({
      targets: this.DOMNode,
      scale: [0.4, active ? 1.3 : 1],
      duration: 250,
      delay: 0,
      elasticity: 200
    });
  };

  push = function() {
    // Clear the timeline to accomodate user
    // stepping backwards through the animations
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.DOMNode,
      opacity: [0, 1],
      scale: 1.3,
      elasticity: 0,
      duration: 2000,
      delay: 500,
      translateY: [55, 0]
    });
  };

  pop = function() {
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.DOMNode,
      opacity: [1, 0],
      duration: 1000,
      elasticity: 1,
      scale: 1,
      translateY: [0, 55]
    });
  };

  finishAnimation = function() {
    if (this.timeline) {
      this.timeline.seek(10000);
    }
  };

  active = function() {
    this.finishAnimation();
    this.timeline = anime.timeline();
    this.timeline.add({
      opacity: 1,
      scale: 1.3,
      delay: 400,
      duration: 900,
      targets: this.DOMNode
    });
  };

  inactive = function() {
    // seek uses ms as unit, use arbitrary large number
    // to ensure completion of animation
    this.finishAnimation();
    this.timeline = anime.timeline();
    this.timeline.add({
      opacity: 0.3,
      scale: 1,
      duration: 900,
      targets: this.DOMNode
    });
  };
}
