const step4 = `We just popped \`require('./userLoader).default\` from line 2 of Main.js off the stack, and returned to Main.js (line 3 and onwards until we hit another function, essentially). Our UserLoader is now configured and exists as an object on the V8 heap (space where objects are stored until garbage collected), a reference to which exists as the constant \`userLoader\`.

Next we perform the first \`.load()\``;

export default step4;
