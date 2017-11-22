import { injectGlobal } from "emotion";

injectGlobal`
html {
  box-sizing: border-box;
  background-color: #f7f7f7;
  font-family: apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body {
  font-size: 14px;
}

a {
  text-decoration: none;
}

body ::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(60, 135, 223, 0.8);
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
}

body ::-webkit-scrollbar-thumb:hover {
  background: rgba(60, 135, 223, 1);
}

body ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

body ::-webkit-scrollbar-track {
  background: rgba(100, 99, 99, 0.27);
  border-radius: 0;
}

*,
:after,
:before {
  box-sizing: inherit;
}

*,
:after,
:before {
  box-sizing: inherit;
}
`;
