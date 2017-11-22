import anime from "animejs";

export default class Animations {
  constructor(taskNode, queue) {
    this.taskNode = taskNode;
    this.queueDimensions = taskNode.parentNode.getBoundingClientRect();
    this.timeline = null;
  }

  push = function(num = 0) {
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.taskNode,
      scale: [0.7, 1],
      opacity: 1,
      translateX: [this.queueDimensions.right, 0],
      delay: 0,
      easing: "linear",
      elasticity: 0,
      duration: 1000
    });
  };

  pop = function() {
    this.timeline = null;
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.taskNode,
      scale: [1, 0.7],
      translateY: {
        value: [0, -100],
        elasticity: 0,
        easing: "linear",
        duration: 1000
      },
      opacity: [1, 0],
      delay: 0,
      elasticity: 0,
      duration: 1500
    });
  };

  completeAnimation = function() {
    if (this.timeline) {
      this.timeline.seek(10000);
    }
  };
}
