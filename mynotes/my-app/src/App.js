import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);

	const apiEndpoints = {
		getNotes: () => `${API_BASE_URL}/api/notes/`,
		getNote: (id) => `${API_BASE_URL}/api/notes/${id}/`,
		createNote: () => `${API_BASE_URL}/api/notes/create/`,
		
	  };
	
	useEffect(() => {
		fetch(apiEndpoints.getNotes())
		  .then((response) => response.json())
		  .then((data) => setNotes(data))
		  .catch((error) => console.error('Error fetching notes:', error));
	}, []);
	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);
	
	const addNote = (text) => {
        const deadline = prompt('Enter deadline for the note (YYYY-MM-DD HH:mm:ss):');
        if (deadline !== null) {
            const date = new Date();
            const newNote = {
                id: nanoid(),
                text: text,
                date: date.toLocaleDateString(),
                deadline: deadline,
            };

			const now = new Date();
        	const deadlineDate = new Date(deadline);
        	const timeDifference = deadlineDate - now;
        	if (timeDifference < 0) {
            	newNote.timerColor = 'red';
			}
            const newNotes = [...notes, newNote];
            setNotes(newNotes);
        }
    };

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;