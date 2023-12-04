
import { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, date, deadline, handleDeleteNote }) => {
    const [timerColor, setTimerColor] = useState('');

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const now = new Date();
            const deadlineDate = new Date(deadline);
            const timeDifference = deadlineDate - now;

            if (timeDifference < 0) {
                setTimerColor('red');
            }

        }, 1000);

        return () => clearInterval(timerInterval);
    }, [deadline]);

    return (
        <div className={`note ${timerColor}`}>
            <span>{text}</span>
            <div className='note-footer'>
                <small>{date}</small>
                <small>Deadline: {deadline}</small>
                <MdDeleteForever
                    onClick={() => handleDeleteNote(id)}
                    className='delete-icon'
                    size='1.3em'
                />
            </div>
        </div>
    );
};

export default Note;
