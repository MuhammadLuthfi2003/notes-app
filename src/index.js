import React from 'react';
import { createRoot } from 'react-dom/client';


const element = <h1>todoapp project</h1>;

const container = createRoot(document.getElementById('container'));
container.render(element);