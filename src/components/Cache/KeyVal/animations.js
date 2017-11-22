import anime from "animejs";

export default class Animations {
  constructor(DOMNode, statusSpan, valueSpan) {
    this.DOMNode = DOMNode;
    this.statusSpan = statusSpan;
    this.valueSpan = valueSpan;
    this.timeline = null;
  }

  enter = function() {
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.DOMNode,
      opacity: [0, 1],
      translateY: [700, 0],
      delay: 200,
      easing: "linear",
      elasticity: 0,
      duration: 1000
    });
  };

  exit = function() {
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.DOMNode,
      opacity: [1, 0],
      translateX: [0, 400],
      delay: 0,
      easing: "linear",
      elasticity: 0,
      duration: 1000
    });
  };
}
