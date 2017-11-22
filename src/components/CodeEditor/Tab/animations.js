import anime from "animejs";

export default class Animations {
  constructor(tabNode, indicatorNode) {
    this.tabNode = tabNode;
    this.indicatorNode = indicatorNode;
  }

  active = function() {
    anime({
      targets: this.tabNode,
      backgroundColor: ["#6a6464", "#302e2e"],
      duration: 400,
      delay: 0,
      elasticity: 0
    });

    anime({
      targets: this.indicatorNode,
      opacity: [0, 1],
      duration: 250,
      elasticity: 0,
      delay: 100
    });
  };

  inactive = function() {
    anime({
      targets: this.tabNode,
      backgroundColor: ["#302e2e", "#6a6464"],
      duration: 400,
      elasticity: 0
    });

    anime({
      targets: this.indicatorNode,
      opacity: [1, 0],
      duration: 350,
      delay: 0,
      offset: 0,
      elasticity: 0
    });
  };
}

// export const active = (tab, indicatorNode) => {
//   const timeline = anime.timeline();

//   timeline.seek(100)
//   timeline.add({
//     targets: tab,
//     backgroundColor: ["#6a6464", "#302e2e"],
//     duration: 2000,
//     delay: 0,
//     elasticity: 0
//   });

//   timeline.add({
//     targets: indicatorNode,
//     opacity: [0, 1],
//     duration: 1000,
//     elasticity: 0,
//     offset: 250
//   });
// };

// export const inactive = (tab, indicatorNode) => {
//   timeline.seek(100)
//   const timeline = anime.timeline();
//   timeline.add({
//     targets: tab,
//     backgroundColor: ["#302e2e", "#6a6464"],
//     duration: 2000,
//     elasticity: 0
//   });

//   timeline.add({
//     targets: indicatorNode,
//     opacity: [1, 0],
//     duration: 500,
//     delay: 0,
//     offset: 0,
//     elasticity: 0
//   });
// };
