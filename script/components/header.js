// header.js
document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("header-container");
    const headerHTML = ` <link rel="stylesheet" href="/style/header/header.css">
    <header class="header"> 
        <a href="/index.html">
            <img src="/src/icons/arrowsleft.png" alt="Left Arrow" class="arrow-left">
        </a>
        <h1>Diary Note 
            <a href="/index.html">
                <img src="/src/image/Diarynote-page/homeicon.png" alt="Home" class="home-icon">
            </a>
        </h1>
        <a href="#">
            <img src="/src/icons/arrowsright.png" alt="Right Arrow" class="arrow-right">
        </a>
    </header>
    `;

    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }
});




