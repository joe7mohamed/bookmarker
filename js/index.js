const bookmarkForm = document.getElementById('bookmarkForm');
const bookmarkTitle = document.getElementById('bookmarkTitle');
const bookmarkURL = document.getElementById('bookmarkURL');
const titleError = document.getElementById('titleError');
const urlError = document.getElementById('urlError');
const bookmarkTableBody = document.getElementById('bookmarkTableBody');

var bookmarkArray = [];

if (localStorage.getItem('bookmarks') !== null) {
    bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}


const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-zA-Z0-9$-_@.&+!*\'(),]|(\\%[0-9a-fA-F]{2})){1,256})' + // domain
    '\\.)+[a-zA-Z]{2,6}|' + // TLD
    '((\\d{1,3}\\.){3}\\d{1,3})' + // OR ip (v4) address
    '(:\\d{1,5})?' + // port
    '(\\/[-a-zA-Z0-9%_.~+]*)*' + // path
    '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z0-9_]*)?$'); // fragment locater

bookmarkTitle.addEventListener('input', function () {
    if (bookmarkTitle.value.length >= 3) {
        bookmarkTitle.classList.remove('is-invalid');
        bookmarkTitle.classList.add('is-valid');
        titleError.classList.add('d-none');
    } else {
        bookmarkTitle.classList.add('is-invalid');
        titleError.classList.remove('d-none');
    }
});

bookmarkURL.addEventListener('input', function () {
    if (urlPattern.test(bookmarkURL.value)) {
        bookmarkURL.classList.remove('is-invalid');
        bookmarkURL.classList.add('is-valid');
        urlError.classList.add('d-none');
    } else {
        bookmarkURL.classList.add('is-invalid');
        urlError.classList.remove('d-none');
    }
});

bookmarkForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const isTitleValid = bookmarkTitle.value.length >= 3;
    const isURLValid = urlPattern.test(bookmarkURL.value);

    if (isTitleValid && isURLValid) {
        const bookmarkObject = {
            title: bookmarkTitle.value,
            url: bookmarkURL.value
        };
        bookmarkArray.push(bookmarkObject);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
        displayBookmarks();
        alert('Bookmark added!');
        bookmarkForm.reset();
        bookmarkTitle.classList.remove('is-invalid', 'is-valid');
        bookmarkURL.classList.remove('is-invalid', 'is-valid');
        titleError.classList.add('d-none');
        urlError.classList.add('d-none');
    } else {
        if (!isTitleValid) {
            bookmarkTitle.classList.add('is-invalid');
            titleError.classList.remove('d-none');
        }
        if (!isURLValid) {
            bookmarkURL.classList.add('is-invalid');
            urlError.classList.remove('d-none');
        }
    }
});

function display() {
    // var cartona = ``;
    // for (var i = 0; i < bookmarkArray.length; i++) {
    //     cartona += `<div class="card">
    //             <div class="card-body">
    //                 <h5 class="card-title">${bookmarkArray[i].title}</h5>
    //                 <p class="card-text">${bookmarkArray[i].url}</p>
    //                 <a href="#" class="btn btn-dark">Button</a>
    //             </div>
    //         </div>`;
    //     document.getElementById('rowData').innerHTML = cartona;
    // }
}
function displayBookmarks() {
    var cartona = ``;
    for (let i = 0; i < bookmarkArray.length; i++) {
        cartona += `
        <tr>
            <th scope="row">${i + 1} </th>
            <td>${bookmarkArray[i].title}</td>
            <td>
            <a href="${bookmarkArray[i].url}" target="_blank" class="btn btn-outline-secondary"> <i class="fa-regular fa-eye"></i></a>
            <a href="#" class="btn btn-outline-danger" onclick="deleteBookmark(${i})"> <i class="fa-solid fa-delete-left"></i></a>
            </td>

            </tr>
        `;
        document.getElementById('bookmarkTableBody').innerHTML = cartona;
    }
}

function deleteBookmark(index) {
    bookmarkArray.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    displayBookmarks();
}