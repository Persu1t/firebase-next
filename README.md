# Real Estate Website

Welcome to the Real Estate Website repository!Name of this project Fire Homes. This project is built using Next.js and Firebase and allows users to search for homes to buy. It features an authentication system for both users and admins, including Google login and password recovery functionality.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About
This project is a real estate website where users can search for homes to buy. It includes advanced search functionality allowing users to filter properties by maximum price, minimum price, and the number of bedrooms. The website also features an authentication system for users and administrators, with options for password recovery and Google login.

## Features
- Responsive design for various devices
- User and admin authentication system
  - Email and password login
  - Google login
  - Forgot password functionality
- Advanced property search
  - Filter by maximum price
  - Filter by minimum price
  - Filter by number of bedrooms
- Property listings with detailed information

## Technologies
- **TypeScript**: The primary programming language used for building the project.
- **Next.js**: The React framework used for building the user interface.
- **Firebase**: Used for authentication, database, and hosting.
- **Shadcn UI**: For styling the web pages.
- **JavaScript**: Used alongside TypeScript for additional functionality.

## Installation
To get a local copy of the project up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Persu1t/firebase-next.git
   cd firebase-next
2. **Install dependencies:**
    npm install
3. **Set up Firebase:**

    Create a Firebase project at Firebase Console
    Add a web app to your Firebase project
    Copy the Firebase config object and paste it into a .env.local file in the root of your project:
    
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    
    Also you will need to have backend related Firebase service account for this project. So you have to download that.
    You can find it in **Project settings** > **Service account**

4. **Start the development server:**

    npm run dev

5.**Open your browser and visit:**

    http://localhost:3000

## Usage
After setting up the project, you can start exploring the features:

- **Authentication**: Register, login with email/password or Google, and recover your password if forgotten.
- **Search Properties**: Use the search functionality to filter properties based on maximum price, minimum price, and the number of bedrooms.
- **Property Listings**: Browse through the list of properties and view detailed information about each one.

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
If you have any questions or want to connect, you can reach me at:
- **Email**: shuklarishabh890@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/rishabh-shukla-709127357/
- **Instagram**: https://www.instagram.com/shukla_rishabh_/
