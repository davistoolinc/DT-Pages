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

function renderHeader() {
 header.innerHTML = `
    <img src="Pictures/logo-img.jpg" alt="Davis Tool Incorporated logo">

    <aside class="company-motto center-aligned"> Quality, Service, Value </aside>
    
    <nav>
        <input type="checkbox" id="hamburger" class="hamburger right-aligned nav-btn">
        </input>
        <label for="hamburger" class="hamburger-btn" aria-label="Open navigation menu">
            <span class="nav-btn"></span>
            <span class="nav-btn"></span>
            <span class="nav-btn"></span>
        </label>

        <ul class="large-nav hidden">
            ${renderNavLinks()}
        </ul>

        <ul class="nav-links">
            ${renderNavLinks()}
        </ul>

        
    </nav>
`
}

function renderFooter() {
    footer.innerHTML = `
        <address id="contact-information">
            <a href="tel:1-509-891-5568" aria-label="Call us"><span class="icon-phone"></span></a>
            <a href="mailto:neal@davistoolinc.com?subject=Website Inquiry" aria-label="Email us"><span class="icon-envelop"></span></a>
            <a href="https://www.google.com/maps/place/Davis+Tool+Inc/@47.6790295,-117.2716579,17z/data=!3m1!4b1!4m6!3m5!1s0x549e1f8a8be2aecb:0x881da9a98c04aead!8m2!3d47.6790259!4d-117.269083!16s%2Fg%2F11bvtb87ng?entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoASAFQAw%3D%3D"><span class="icon-location" aria-label="Directions"><span></a>
        </address>

        <p class="right-aligned" id="copyright"> 
            Davis Tool, Inc. &copy; ${currentYear} 
        </p>
    `
}

function renderNavLinks() {
    return `
        <li><a class="menu-link" href="index.html">Home</a></li>
        <li><a class="menu-link" href="markets.html">Markets</a></li>
        <li><a class="menu-link" href="capabilities.html">Capabilities</a></li>
        <li><a class="menu-link" href="facility.html">Facility</a></li>
        <li><a class="menu-link" href="contact.html">Contact Us</a></li>
    `
}