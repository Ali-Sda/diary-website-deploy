
document.addEventListener('DOMContentLoaded', () => {
    const newBtn = document.getElementById('new-btn');
    const noteList = document.getElementById('note-list');
    const searchBar = document.getElementById('search-bar');
    const viewAllBtn = document.getElementById('view-all-btn');
    const viewModal = document.getElementById('view-modal');
    const closeBtn = document.getElementById('close-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    let notes = [];

    // Function to save notes to local storage
    const saveNotesToLocalStorage = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Load notes from local storage if available
    const savedNotes = localStorage.getItem('notes');
    notes = savedNotes ? JSON.parse(savedNotes) : [];

    const renderNotes = (notesToRender) => {
        noteList.innerHTML = '';
        // Check the screen width
        const isMobile = window.innerWidth <= 768;
        const notesToShow = isMobile ? 3 : 10; // Show 3 notes on mobile, otherwise 10 notes

        notesToRender.slice(0, notesToShow).forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            noteList.appendChild(noteElement);
        });
    };

    const createNoteElement = (note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        if (note.completed) noteElement.classList.add('completed');
        noteElement.style.backgroundColor = note.color;
        noteElement.dataset.index = index;
        noteElement.innerHTML = `
            <input type="text" value="${note.title}" placeholder="Write your Title here" ${note.editing ? '' : 'readonly'}>
            <input type="date" value="${note.date}" ${note.editing ? '' : 'readonly'}>
            <textarea placeholder="Write your note here..." ${note.editing ? '' : 'readonly'}>${note.content}</textarea>
            <input type="color" value="${note.color}" class="color-picker" ${note.editing ? '' : 'disabled'}>
            <div class="actions">
                <button class="${note.editing ? 'save-btn' : 'edit-btn'}">${note.editing ? 'Save' : 'Edit'}</button>
                <button class="view-btn"><img src="/src/icons/viewdetail.png" alt="View Details"></button>
                <button class="color-btn">
                    <img src="/src/icons/color.png" alt="Change Color">
                    <input type="color" class="color-picker" value="${note.color}" ${note.editing ? '' : 'disabled'}>
                </button>
                <input type="checkbox" ${note.completed ? 'checked' : ''}>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const titleInput = noteElement.querySelector('input[type="text"]');
        const dateInput = noteElement.querySelector('input[type="date"]');
        const noteTextarea = noteElement.querySelector('textarea');
        const colorPicker = noteElement.querySelector('.color-picker');
        const saveOrEditBtn = noteElement.querySelector(note.editing ? '.save-btn' : '.edit-btn');
        const deleteBtn = noteElement.querySelector('.delete-btn');
        const viewBtn = noteElement.querySelector('.view-btn');
        const colorBtn = noteElement.querySelector('.color-btn');
        const completedCheckbox = noteElement.querySelector('input[type="checkbox"]');

        saveOrEditBtn.addEventListener('click', () => {
            if (note.editing) {
                note.title = titleInput.value;
                note.date = dateInput.value;
                note.content = noteTextarea.value;
                note.editing = false;
                note.completed = completedCheckbox.checked;
            } else {
                note.editing = true;
            }
            renderNotes(notes);
            renderAllNotes(); // Update modal view
            saveNotesToLocalStorage(); // Save to local storage
        });

        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            renderAllNotes(); // Update modal view
            renderNotes(notes); // Update main view
            saveNotesToLocalStorage(); // Save to local storage
        });

        completedCheckbox.addEventListener('change', () => {
            note.completed = completedCheckbox.checked;
            renderNotes(notes);
            renderAllNotes(); // Update modal view
            saveNotesToLocalStorage(); // Save to local storage
        });

        colorPicker.addEventListener('input', (event) => {
            note.color = event.target.value;
            noteElement.style.backgroundColor = note.color;
            saveNotesToLocalStorage(); // Save to local storage
        });

        colorBtn.addEventListener('click', () => {
            if (note.editing) {
                colorPicker.click();
            }
        });

        viewBtn.addEventListener('click', () => {
            const viewModalContent = document.querySelector('.view-modal-content');
            viewModalContent.innerHTML = `
                <span id="close-btn" class="close-btn">&times;</span>
                <h2>Note Details</h2>
                <p><strong>Title:</strong> ${note.title}</p>
                <p><strong>Date:</strong> ${note.date}</p>
                <p><strong>Content:</strong> ${note.content}</p>
                <p><strong>Color:</strong> <span style="background-color: ${note.color}; padding: 5px; border-radius: 5px;">&nbsp;</span></p>
            `;
            viewModal.style.display = 'block';

            const newCloseBtn = viewModalContent.querySelector('#close-btn');
            newCloseBtn.addEventListener('click', () => {
                viewModal.style.display = 'none';
            });
        });

        return noteElement;
    };

    newBtn.addEventListener('click', () => {
        notes.unshift({
            title: '',
            date: '',
            content: '',
            completed: false,
            color: '#f9f9f9',
            editing: true
        });
        renderNotes(notes);
        saveNotesToLocalStorage(); // Save to local storage
    });

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        );
        renderNotes(filteredNotes);
    });

    viewAllBtn.addEventListener('click', () => {
        const viewModalContent = document.querySelector('.view-modal-content');
        viewModalContent.innerHTML = `
            <span id="close-btn" class="close-btn">&times;</span>
            <h2>All Notes</h2>
            <button id="delete-all-btn" class="delete-all-btn">Delete All Notes</button>
            <div id="all-notes" class="all-notes-container">
                <!-- Notes will be dynamically added here -->
            </div>
        `;
    
        const allNotesContainer = viewModalContent.querySelector('.all-notes-container');
    
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.color;
    
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                notes.splice(index, 1);
                renderAllNotes(); // Re-render all notes in modal
                renderNotes(notes); // Update main view
                saveNotesToLocalStorage(); // Save to local storage
            });
    
            noteElement.innerHTML = `
                <p><strong>Title:</strong> ${note.title}</p>
                <p><strong>Date:</strong> ${note.date}</p>
                <p><strong>Content:</strong> ${note.content}</p>
                <p><strong>Color:</strong> <span style="background-color: ${note.color}; padding: 5px; border-radius: 5px;">&nbsp;</span></p>
            `;
    
            noteElement.appendChild(deleteBtn);
            allNotesContainer.appendChild(noteElement);
        });
    
        if (notes.length > 3) {
            viewModalContent.classList.add('scrollable');
        } else {
            viewModalContent.classList.remove('scrollable');
        }
    
        viewModal.style.display = 'block';
    
        // Hide header and search bar
        const header = document.querySelector('header');
        const searchBar = document.getElementById('search-bar');
        header.style.display = 'none';
        searchBar.style.display = 'none';
    
        const newCloseBtn = viewModalContent.querySelector('#close-btn');
        newCloseBtn.addEventListener('click', () => {
            viewModal.style.display = 'none';
            // Restore header and search bar visibility
            header.style.display = 'block';
            searchBar.style.display = 'block';
        });
    
        const deleteAllBtn = viewModalContent.querySelector('#delete-all-btn');
        deleteAllBtn.addEventListener('click', () => {
            notes = [];
            renderNotes(notes);
            viewModal.style.display = 'none';
            // Restore header and search bar visibility
            header.style.display = 'block';
            searchBar.style.display = 'block';
            saveNotesToLocalStorage(); // Save to local storage
        });
    });

    closeBtn.addEventListener('click', () => {
        viewModal.style.display = 'none';
    });

    function renderAllNotes() {
        const allNotesContainer = document.querySelector('#all-notes');
        allNotesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.color;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                notes.splice(index, 1);
                renderAllNotes(); // Re-render all notes in modal
                renderNotes(notes); // Update main view
                saveNotesToLocalStorage(); // Save to local storage
            });

            noteElement.innerHTML = `
                <p><strong>Title:</strong> ${note.title}</p>
                <p><strong>Date:</strong> ${note.date}</p>
                <p><strong>Content:</strong> ${note.content}</p>
                <p><strong>Color:</strong> <span style="background-color: ${note.color}; padding: 5px; border-radius: 5px;">&nbsp;</span></p>
            `;

            noteElement.appendChild(deleteBtn);

            allNotesContainer.appendChild(noteElement);
        });
    }

    // Initial rendering
    renderNotes(notes);

    window.addEventListener('resize', () => {
        renderNotes(notes);
    });
});