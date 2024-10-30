document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        eventDetails: document.getElementById('eventDetails').value,
    };

    fetch('/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Order placed successfully!');
        // You could also trigger an SMS notification here
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


const menuIcon = document.querySelector('.menu-icon');
const nav = document.getElementById('nav');

menuIcon.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});