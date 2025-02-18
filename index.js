const header = document.getElementById('header')
const footer = document.getElementById('footer')
const copyrightArea = document.getElementById('copyright')
const addressSection = document.getElementById('address')
const dateObject = new Date()
const currentYear = dateObject.getFullYear()

function renderContent() {
    renderHeader()
    renderFooter()
}

function renderHeader() {
 header.innerHTML = `
    <div class="img-container">
        <img src="Pictures/logo-img.jpg" alt="Davis Tool Incorporated logo">
    </div>

    <p class="center-aligned"> Quality <span class="">Service</span> Value </p>
    
    <nav class="right-aligned">
        <button type="button">|||</button>
        <!-- <ul>
            <li class="menuitem"><a href="Index.htm"><button class="metal linear">Home</button></a></li>
            <li class="menuitem"><a href="DavisMarkets.htm"><button class="metal linear">Markets</button></a></li>
            <li class="menuitem"><a href="DavisCapabilities.htm"><button class="metal linear">Capabilities</button></a></li>
            <li class="menuitem"><a href="DavisFacility.htm"><button class="metal linear">Facility</button></a></li>
            <li class="menuitem"><a href="DavisContact.htm"><button class="metal linear">Contact Us</button></a></li>
        </ul> -->
    </nav>
 `
}

function renderFooter() {
    footer.innerHTML = `
            <p id="copyright"> Davis Tool Inc. &copy; ${currentYear} </p>
            <address class="right-aligned" id="address">
                <!-- <a href="https://maps.app.goo.gl/mu9HZ1XKsb3fH4f36"> -->
                    10111 E. Montgomery Ave.
                    <br />
                    Spokane Valley, WA 99206
                <!-- </a> -->
                    <br />
                <!-- <p> -->
                    <!-- <a href="tel:+15098915568"> -->
                    (509) 891-5568
                <!-- </a> -->
                <!-- </p> -->
            </address>
    `
}

renderContent()