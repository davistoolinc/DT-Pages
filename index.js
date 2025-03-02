const header = document.getElementById('header')
const footer = document.getElementById('footer')
const copyrightArea = document.getElementById('copyright')
const addressSection = document.getElementById('address')
const dateObject = new Date()
const currentYear = dateObject.getFullYear()

renderContent()

function renderContent() {
    renderHeader()
    renderFooter()
}

const navLinks = document.querySelector('.nav-links')
const hamburgerBtn = document.querySelector('.hamburger')

document.addEventListener('click', (e) => {
    [...e.target.classList].includes('nav-btn') ? handleNav(e) : ''
})



function handleNav(e) {
    hamburgerBtn.classList.toggle('active')
    navLinks.classList.toggle('active')
}

function renderHeader() {
 header.innerHTML = `
    <img src="Pictures/logo-img.jpg" alt="Davis Tool Incorporated logo">

    <aside class="company-motto center-aligned"> Quality, Service, Value </aside>
    
    <nav>
        <div class="large-nav hidden">
            <div class="right-aligned">
                <a class="menu-link" href="index.html">Home</a>
                <a class="menu-link" href="markets.html">Markets</a>
                <a class="menu-link" href="capabilities.html">Capabilities</a>
                <a class="menu-link" href="facility.html">Facility</a>
                <a class="menu-link" href="contact.html">Contact Us</a>
            </div>
        </div>

        <ul class="nav-links">
            <li><a class="menu-link" href="index.html">Home</a></li>
            <li><a class="menu-link" href="markets.html">Markets</a></li>
            <li><a class="menu-link" href="capabilities.html">Capabilities</a></li>
            <li><a class="menu-link" href="facility.html">Facility</a></li>
            <li><a class="menu-link" href="contact.html">Contact Us</a></li>
        </ul>
        
            <button type="button" class="hamburger right-aligned nav-btn">
                <span class="nav-btn"></span>
                <span class="nav-btn"></span>
                <span class="nav-btn"></span>
            </button>
    </nav>
`
}

function renderFooter() {
    footer.innerHTML = `
        <p class="copyright" id="copyright"> 
            Davis Tool, Inc. &copy; ${currentYear} 
        </p>

        <address class="right-aligned" id="address">
            10111 E. Montgomery Ave.
            <br />
            Spokane Valley, WA 99206
            <br />
            <a href="tel:1-509-891-5568">(509) 891-5568</a>
        </address>
    `
}