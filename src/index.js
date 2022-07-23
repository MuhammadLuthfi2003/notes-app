import React from 'react';
import { createRoot } from 'react-dom/client';

//import css
import './styles/style.css';

//get data from storage in previous sessions
import notes from './data/data';

//import components from components folder
import NoteForm from './components/inputForm';


console.log(notes);

const container = createRoot(document.getElementById('container'));
container.render(<NoteForm />);