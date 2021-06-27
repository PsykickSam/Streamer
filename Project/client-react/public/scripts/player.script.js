// const canvas = document.getElementById("visualizer");

// // Setup
// console.log(window.innerWidth, window.innerHeight);

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const context = canvas.getContext("2d");
// const radius = 150;
// const bars = 200;

// // Find the center of the window
// const window_center_x = canvas.width / 2;
// const window_center_y = canvas.height / 2;

// // Draw a circle
// context.beginPath();
// context.arc(window_center_x, window_center_y, radius, 0, 2 * Math.PI);
// context.stroke();

// // Draw bars
// const drawBar = (x1, y1, x2, y2, width, frequency) => {
//   const lineColor = "#fff";

//   context.strokeStyle = lineColor;
//   context.lineWidth = width;
//   context.beginPath();
//   context.moveTo(x1, y1);
//   context.moveTo(x2, y2);
//   context.stroke();
// }

// for (let i = 0; i < bars; i++) {
//   // Divide a circle into equal bars
//   const rads = Math.PI * 2 / bars;
//   const bar_height = 100;
//   const bar_width = 2;

//   const x = window_center_x + Math.cos(rads * i) * (radius);
//   const y = window_center_y + Math.sin(rads * i) * (radius);
//   const x_end = window_center_x + Math.cos(rads * i) * (radius + bar_height);
//   const y_end = window_center_y + Math.sin(rads * i) * (radius + bar_height);

//   // Draw bar
//   drawBar(x, y, x_end, y_end, bar_width, null);
// }