// toogle icon navbar
let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

// scroll section active link
let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');

window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top >= offset && top<offset+height){
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });
        };
    });
    // sticky navbar
    let header=document.querySelector('header');
    header.classList.toggle('sticky',window.scroolY > 100);

    // remove toggle icon and navbar when click navbar link(scroll)
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
}

// scroll reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 350
});

ScrollReveal().reveal('.home-content, .heading',{origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact-form',{origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img',{origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content',{origin: 'right'});

// typed js
const typed = new Typed('.multiple-text',{
    strings: ['Student','Web Developer','Graphic Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Toast Notification Function
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    const icon = type === 'success' ? '✓' : '✗';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('.btn');
    const originalBtnText = btn.textContent;
    
    // Disable button and show loading state
    btn.disabled = true;
    btn.textContent = 'Sending...';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch('https://formspree.io/f/xnjaalke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                _replyto: formData.email,
                _subject: `Portfolio Contact: ${formData.subject}`
            })
        });
        
        if (response.ok) {
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showToast('Failed to send message. Please try again or email me directly at maharjan.ashwin098@gmail.com', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = originalBtnText;
    }
});