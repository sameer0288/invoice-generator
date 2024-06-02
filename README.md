# Invoice Generator

# Live URL:- https://invoice-generator-frontend-murex.vercel.app/
This is a full-stack web application for generating invoices using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to create and download invoices in PDF format.

## Tech Stack
- ReactJS
- Redux for State Management
- NodeJS
- ViteJS (Build tool)
- TypeScript
- Tailwind CSS
- Tailadmin (Optional for faster frontend UI)
- Puppeteer (for server-side PDF generation)

## Features
- User Authentication (Login and Registration)
- Add Products
- Generate PDF Invoice
- CRUD Operations for Products

## Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/sameer0288/invoice-generator.git
    cd invoice-generator/invoice-generator-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd invoice-generator-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

### Additional Libraries or Tools Used
- **Axios:** For making HTTP requests from the frontend.
- **Chalk:** For colored console logs in the backend.
- **Redux Toolkit:** For state management in the frontend.
- **Tailwind CSS:** For styling the frontend components.
- **Puppeteer:** For generating PDFs on the server side.

## Usage
1. Register a new user or login with an existing account.
2. Add products on the "Add Products" page.
3. Generate a PDF invoice from the "Generate PDF" page.

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## Contact
For any questions or issues, please contact [sameersheikh0288@gmail.com].
