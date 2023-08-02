import React from "react";
import {createRoot} from 'react-dom/client';
const domNode = document.getElementById('root');
const root = createRoot(domNode);
import "./index.css";

import App from "./App";

root.render(<App />);
