import React from "react";

export const deviceWarningContent = {
  header: "This visualisation requires a wide-screen (>=1024p) device",
  content: [
    `Visualise DataLoader makes heavy use of animations alongside markdown content and code blocks.`,
    <br key={3} />,
    <br key={4} />,
    `Unfortunately,
    this would require significant restructuring for display on small screen devices, at the expense of coherence and 
    a poor user-experience due to side-scrolling code blocks.`,
    <br key={6} />,
    <br key={7} />,
    `As the target audience for this tutorial
    consists of developers (who work on widescreen devices), there is limited value in porting
    the project to mobile. Apologies for the inconvenience, and I hope you revisit later!`
  ]
};

export const viewportWarningContent = {
  header: "Enlarge your viewport",
  content: [
    "This visualisation is best viewed at >= 1024 pixels.",
    <br key={3} />,
    <br key={4} />,
    `Please increase your browser's window size for the best
    experience.`
  ],
  button: true
};
