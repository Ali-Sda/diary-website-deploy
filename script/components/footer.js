document.addEventListener("DOMContentLoaded", function() {
    const footerContainer = document.getElementById("footer-container");

    const footerHTML = ` <link rel="stylesheet" href="/style/footer/footer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <footer class="footer">
            <div class="footer-overlay">
                <div class="container">
                    <div class="footer-row">
                        <div class="footer-col">
                            <img src="/src/image/footer/girlprofile.png" alt="">
                        </div>
                        <div class="footer-col">
                            <h4>Contact Us</h4>
                            <p>
                                <i class="fas fa-phone"></i> &nbsp; +855 974053800<br>
                                <i class="fas fa-envelope"></i> &nbsp; panhaphosda@gmail.com
                            </p>
                        </div>
                        <div class="footer-col">
                            <h4>Follow Us</h4>
                            <div class="social-links">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-telegram"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-gitlab"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; Phosda Diary Note | A&B 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    `;

    footerContainer.innerHTML = footerHTML;
    
    document.head.appendChild(style);

});
