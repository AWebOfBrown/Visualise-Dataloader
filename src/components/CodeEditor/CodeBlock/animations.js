import anime from "animejs";

export default class Animations {
  constructor(node) {
    this.node = node;
    this.highlight = null;
    this.scrolling = null;
  }

  // distance is the line's domNode.scrollTop
  // delay is to account for rendering the tab (if not curently selected)
  scroll = function(distance) {
    if (this.scrolling !== null) {
      this.scrolling.pause();
      this.scrolling = null;
    }

    this.scrolling = anime({
      targets: this.node,
      scrollTop: distance,
      duration: 500,
      elasticity: 0,
      delay: 400
    });
  };

  // clear if currently highlighting (opacity animation)
  // using pause/seek
  startHighlight = function(lines) {
    if (this.highlight !== null) {
      this.pauseHighlight();
      this.hightlight = null;
    }

    this.highlight = anime({
      targets: [...lines],
      opacity: [1, 0.2],
      duration: 800,
      easing: "easeInOutQuart",
      elasticity: 0,
      loop: true,
      direction: "alternate"
    });
  };

  // requires seperate method so it
  // can be called on mouseLeave
  pauseHighlight = function() {
    if (this.highlight) {
      this.highlight.seek(1);
      this.highlight.pause();
    }
  };

  indicateCallSite = function(line) {
    let text = line.innerHTML;
    anime({
      targets: line
    });
  };
}
