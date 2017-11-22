import anime from "animejs";

class Animations {
  constructor({ dots }) {
    this.dots = dots;
    this.timeline = anime.timeline({
      direction: "forwards",
      loop: true
    });
  }

  highlight = () => {
    const animation = {
      opacity: [0, 1, 0],
      scale: [{ value: 1 }, { value: 1.25 }, { value: 1 }],
      translateY: ["0px", "-10px", "0px"],
      translateX: ["0px", "7px"],
      duration: 1500
    };

    this.timeline
      .add({
        ...animation,
        targets: this.dots[0],
        easing: "easeInQuad",
        offset: 0
      })
      .add({
        ...animation,
        targets: this.dots[1],
        easing: "easeInQuad",
        offset: 125
      })
      .add({
        ...animation,
        targets: this.dots[2],
        easing: "easeInQuad",
        offset: 250
      });
  };
}

export default Animations;
