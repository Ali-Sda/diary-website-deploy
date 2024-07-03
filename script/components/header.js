// header.js
document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("header-container");
    const headerHTML = `<link rel="stylesheet" href="/style/header/header.css">
        <div class="header"> 
            <a href="">
                <img src="/src/icons/arrowsleft.png" alt="" class="arrow-left">
            </a>
            <h1>Diary Note 
                <a href="/index.html">
                    <img src="/src/image/Diarynote-page/homeicon.png" alt="home" class="home-icon">
                </a>
            </h1>
            <a href="#">
                <img src="/src/icons/arrowsright.png" alt="" class="arrow-right">
            </a>
        </div>
    `;
    headerContainer.innerHTML = headerHTML;
    document.head.appendChild(style);

});

