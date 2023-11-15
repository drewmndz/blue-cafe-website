const hamburger = document.querySelector('.header__hamburger-menu i')
const headerMenu = document.querySelector('.header__links')

const linkEls = document.querySelectorAll('.header__link')
const sectionEls = document.querySelectorAll('section')
const TABLET_SIZE = 834
const MINUS_OFFSET_TOP = 250
let currentSection = 'home'

const menuItems = document.querySelectorAll('.menu__flex-item')
const okModalMenu = document.querySelector('.ok-modal-menu')
const menuModal = document.querySelector('.menu-modal')

const contactForm = document.querySelector('form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')
const contactModal = document.querySelector('.contact-modal')
const okModalContact = document.querySelector('.ok-modal-contact')


// toggle the hamburger menu
function toggle() {
    if(hamburger.classList.contains('fa-bars')) {
        hamburger.classList.remove('fa-bars')
        hamburger.classList.add('fa-x')
    } else {
        hamburger.classList.remove('fa-x')
        hamburger.classList.add('fa-bars')
    }
    headerMenu.classList.toggle('active')
}

hamburger.onclick = toggle

linkEls.forEach(linkEl => {
    linkEl.addEventListener('click', () => {
        if(window.innerWidth <= TABLET_SIZE) {  
            toggle()
        } 
    })
})

// check what section the user is currently on and highlight the respective navlink
window.addEventListener('scroll', () => {
    sectionEls.forEach(sectionEl => {
        if(window.scrollY >= sectionEl.offsetTop - MINUS_OFFSET_TOP) {
            currentSection = sectionEl.id
        }
    })

    linkEls.forEach(linkEl => {
        linkEl.classList.remove('current')

        if(linkEl.href.includes(currentSection)) {
            linkEl.classList.add('current')
        }
    })
})

// menu click event
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        menuModal.classList.toggle('open')
    })
})

okModalMenu.addEventListener('click', () => {
    menuModal.classList.toggle('open')
})

// contact form validation
contactForm.addEventListener('submit', e => {
    e.preventDefault()
    let name = nameInput.value
    let email = emailInput.value
    let message = messageInput.value
    let isValidName = false
    let isValidEmail = false
    let isValidMessage = false
    const re = /\S+@\S+\.\S+/ // email valid format

    nameInput.nextElementSibling.innerText = name === '' ? "name must not be empty" : ""
    emailInput.nextElementSibling.innerText = email === '' ? "email must not be empty" : ""
    messageInput.nextElementSibling.innerText = message === '' ? "message must not be empty" : ""
    

    if(name === '') {
        nameInput.classList.add('error')
    } else {
        nameInput.classList.remove('error')
        isValidName = true
    }

    if(email === '') {
        emailInput.classList.add('error')
    } else {
        emailInput.classList.remove('error')

        emailInput.nextElementSibling.innerText = !re.test(email) ? "invalid email" : ""

        if(!re.test(email)) {
            emailInput.classList.add('error')
        } else {
            emailInput.classList.remove('remove')
            isValidEmail = true
        }
    }

    if(message === '') {
        messageInput.classList.add('error')
    } else {
        messageInput.classList.remove('error')
        isValidMessage = true
    }

    if(isValidName && isValidEmail && isValidMessage) {
        contactModal.classList.toggle('open')
        nameInput.value = ''
        emailInput.value = ''
        messageInput.value = ''
    }
})

okModalContact.addEventListener('click', () => {
    contactModal.classList.toggle('open')
})