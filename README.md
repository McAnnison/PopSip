# PopSip Cocktails 🍹

A modern, responsive cocktail service booking website that allows clients to book professional cocktail services for their special events. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### 🎯 Core Functionality
- **Interactive Booking System**: Complete booking form with real-time price calculation
- **Cocktail Menu**: Beautiful display of signature cocktails with ingredients and pricing
- **Invoice Generation**: Automatic invoice creation for bookings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Event Showcase**: Portfolio of featured events and services

### 🍸 Cocktail Menu
Our signature cocktails include:
- **Mojito** ($12) - Rum, Mint, Lime, Sugar, Soda Water
- **Margarita** ($14) - Tequila, Triple Sec, Lime Juice, Salt Rim
- **Martini** ($14) - Gin, Dry Vermouth, Olive/Lemon Twist
- **Tequila Sunrise** ($13) - Tequila, Orange Juice, Grenadine
- **Pina Colada** ($15) - Rum, Coconut Cream, Pineapple Juice

### 📋 Booking Features
- Client information collection (name, email, event details)
- Multiple cocktail selection with quantity controls
- Real-time total price calculation
- Add/remove cocktail options dynamically
- Professional invoice generation
- Event type specification (weddings, corporate events, parties)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for testing

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/McAnnison/PopSip.git
   cd PopSip
   ```

2. **Open the website**
   
   **Option A: Direct file access**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

   **Option B: Local server (recommended)**
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Python 2
   python -m SimpleHTTPServer 8080
   
   # Using Node.js (if you have it installed)
   npx serve .
   ```
   
   Then visit `http://localhost:8080` in your browser.

## 📁 Project Structure

```
PopSip/
├── index.html              # Main HTML file with embedded styles and scripts
├── script.js               # Additional JavaScript functionality
├── 2style.css             # Alternative/additional CSS styles
├── README.md              # Project documentation
├── background.jpg         # Hero section background image
├── image_1.jpg            # Mojito cocktail image
├── image_2.jpg            # Margarita cocktail image
├── image_3.jpg            # Additional cocktail image
├── image_4.webp           # Cocktail image (WebP format)
├── image_6.jpg            # Event/cocktail image
├── image_7.jpg            # Event/cocktail image
├── martini.avif           # Martini cocktail image (AVIF format)
├── tequila-sunrise-a164206.jpg # Tequila Sunrise image
├── Cadillac-Margarita-5.jpg   # Premium margarita image
└── .github/               # GitHub configuration
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Responsive design, flexbox, animations, and modern styling
- **JavaScript (ES6+)**: Interactive functionality and dynamic content
- **Google Fonts**: Montserrat and Poppins font families
- **Responsive Design**: Mobile-first approach with media queries

## 💻 Usage

### For Clients
1. **Browse Cocktails**: Scroll through the cocktail menu to see available options
2. **View Events**: Check out featured events in the portfolio section
3. **Book Service**: Use the booking form to:
   - Enter your contact information
   - Select event date and type
   - Choose cocktails and quantities
   - Review the automatically calculated total
   - Submit your booking request

### For Developers
- All styles are embedded in `index.html` for easy deployment
- Additional styles available in `2style.css`
- JavaScript handles form validation, price calculation, and invoice generation
- Images are optimized for web use in various formats (JPG, WebP, AVIF)

## 🖼️ Screenshots

The website features:
- Clean, modern hero section with rotating content
- Professional cocktail menu with pricing
- Interactive booking system with real-time calculations
- Responsive design that works on all devices
- Professional footer with contact information

## 🔧 Customization

### Adding New Cocktails
1. Update the cocktail options in the `index.html` file
2. Add corresponding pricing in the JavaScript price calculator
3. Add cocktail images to the project directory
4. Update the menu section with new cocktail details

### Styling Changes
- Main styles are embedded in `index.html` within the `<style>` tags
- Additional styles can be added to `2style.css`
- Color scheme uses warm oranges and browns for a premium feel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

For inquiries about cocktail services or technical questions:

- **Website**: [PopSip Cocktails](https://github.com/McAnnison/PopSip)
- **GitHub**: [@McAnnison](https://github.com/McAnnison)

---

*Crafted with ❤️ for unforgettable events*
