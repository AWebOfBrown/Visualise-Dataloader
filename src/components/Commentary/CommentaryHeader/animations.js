import anime from "animejs";

export default class Animations {
  constructor({ header }) {
    this.header = header;
  }

  shrinkHeader = function(height) {
    anime({
      targets: this.header,
      height: height,
      duration: 500,
      elasticity: 0,
      easing: "easeOutQuart"
    });
  };

  expandHeader = function(height) {
    anime({
      targets: this.header,
      height: height,
      duration: 500,
      elasticity: 0,
      easing: "easeOutQuart"
    });
  };
}
