Here’s the updated `README.md` with the Prisma commands placed after the database URL setup:

---

# Contact Management System

This is a full-stack application for managing contacts, including functionalities like user authentication, contact creation, viewing, updating, and deletion. It is built using **Express.js** for the backend and **React.js** for the frontend.

---

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Prisma and your PostgreSQL database:

   - Create a `.env` file in the `api` folder with the following content:
     ```
     DATABASE_URL=your_postgresql_database_url
     JWT_SECRET=your_secret_key
     ```

   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```

   - Apply the migrations to create the database tables:
     ```bash
     npx prisma migrate dev --name init
     ```

   - Install the Prisma Client:
     ```bash
     npm install @prisma/client
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Exposed APIs:
   - **Auth Routes:**
     - `POST /api/v1/auth/signup` - Sign up a new user.
     - `POST /api/v1/auth/signin` - Log in an existing user and retrieve a JWT token.

   - **User Routes:**
     - `GET /api/v1/user/profile` - Get the profile of the currently logged-in user.

   - **Contact Routes:**
     - `POST /api/v1/contact/create` - Create a new contact.
     - `GET /api/v1/contact/view` - View all contacts for the logged-in user.
     - `PUT /api/v1/contact/update/:id` - Update an existing contact by ID.
     - `DELETE /api/v1/contact/delete/:id` - Delete a contact by ID.

---

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Create a `.env` file in the `frontend` folder with the following content:
   ```
   VITE_APP_BACKEND_URL=http://localhost:8080
   ```

5. Routes:
   - `/` - Landing page
   - `/signin` - Login page
   - `/signup` - Signup page
   - `/profile` - User profile page
   - `/dashboard` - Dashboard showing the table of contacts
   - `/create` - Create a new contact

---

## TODO List

- [ ] **JWT and Session Management:** Securely manage user sessions and token validation in both backend and frontend.
- [ ] **Frontend Table Completion:** Finish the frontend table to display contact data with sorting and pagination.
- [ ] **Update Feature Completion:** Add a feature to edit contacts in the frontend.

---

## Completed Tasks

- [x] Backend API routes implemented for authentication and contact management.
- [x] Basic frontend routes set up.

