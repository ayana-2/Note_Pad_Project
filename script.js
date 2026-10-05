// ===============================
// REGISTER
// ===============================

let registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("registerName").value.trim();
        let email = document.getElementById("registerEmail").value.trim();
        let password = document.getElementById("registerPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");

        window.location.href = "index.html";

    });
}


// ===============================
// LOGIN
// ===============================

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value;

        let savedUser = localStorage.getItem("user");

        if (!savedUser) {
            alert("Please register first");
            return;
        }

        let user = JSON.parse(savedUser);

        if (
            email === user.email &&
            password === user.password
        ) {

            alert("Login successful!");

            window.location.href = "home.html";

        } else {

            alert("Invalid email or password");

        }

    });
}


// ===============================
// NOTES
// ===============================

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let addNoteButton = document.getElementById("addNoteButton");

let noteForm = document.getElementById("noteForm");

let saveNoteButton = document.getElementById("saveNoteButton");

let noteTitle = document.getElementById("noteTitle");

let noteContent = document.getElementById("noteContent");

let noteImage = document.getElementById("noteImage");

let notesContainer = document.getElementById("notesContainer");

let searchInput = document.getElementById("searchInput");

let searchMessage = document.getElementById("searchMessage");


// ===============================
// SHOW NOTE FORM
// ===============================

if (addNoteButton) {

    addNoteButton.addEventListener("click", function() {

        noteForm.classList.remove("hidden");

    });

}


// ===============================
// SAVE NOTE
// ===============================

if (saveNoteButton) {

    saveNoteButton.addEventListener("click", function() {

        let title = noteTitle.value.trim();

        let content = noteContent.value.trim();

        if (title === "" || content === "") {

            alert("Please enter title and content");

            return;
        }


        let note = {

            title: title,

            content: content

        };


        notes.push(note);


        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );


        noteTitle.value = "";

        noteContent.value = "";

        noteImage.value = "";


        noteForm.classList.add("hidden");


        displayNotes();

    });

}


// ===============================
// DISPLAY NOTES
// ===============================

function displayNotes() {

    if (!notesContainer) {
        return;
    }


    notesContainer.innerHTML = "";


    let searchText = "";


    if (searchInput) {

        searchText =
            searchInput.value.toLowerCase().trim();

    }


    let foundNotes = 0;


    for (let i = 0; i < notes.length; i++) {

        let note = notes[i];


        let title =
            note.title.toLowerCase();


        let content =
            note.content.toLowerCase();


        if (
            title.includes(searchText) ||
            content.includes(searchText)
        ) {

            let card =
                document.createElement("div");


            card.className = "note-card";


            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
            `;


            notesContainer.appendChild(card);


            foundNotes++;

        }

    }


    // Invalid Search

    if (
        searchText !== "" &&
        foundNotes === 0
    ) {

        searchMessage.textContent =
            "Invalid Search! No notes found.";

    } else {

        searchMessage.textContent = "";

    }

}


// ===============================
// LIVE SEARCH
// ===============================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            displayNotes();

        }
    );

}


// ===============================
// DISPLAY NOTES WHEN PAGE OPENS
// ===============================

displayNotes();