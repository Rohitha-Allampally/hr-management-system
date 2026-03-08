# Employee HR Management System

This repository contains a full-stack HR management application with:

- **Backend**: Spring Boot (Java, Maven, Spring Data JPA, MySQL)
- **Frontend**: React (Vite, React Router, Axios)
- **Database**: MySQL (hosted on Aiven)
- **Deployment target**: Render.com (separate services for backend and frontend)

## Local Setup

### Prerequisites

- Java 17+
- Maven
- Node.js 18+ / npm
- MySQL (or use Aiven credentials)

### Backend

1. Open a terminal and navigate to `backend`.
2. Configure environment variables (or set in `application.properties`):
   ```bash
   export DB_URL="jdbc:mysql://host:port/dbname"
   export DB_USER="username"
   export DB_PASSWORD="password"
   ```
   Render will set these automatically.
3. Build and run:
   ```bash
   ./mvnw clean package
   java -jar target/*.jar
   ```
4. API base URL: `http://localhost:8080/api`.
   - `GET /employees`
   - `GET /employees/{id}`
   - `POST /employees`
   - `PUT /employees/{id}`
   - `DELETE /employees/{id}`

### Frontend

1. Navigate to `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in browser.

   - The app includes login (mock), dashboard, employee list, add/edit forms.
   - API requests point to `REACT_APP_API_URL` (default `http://localhost:8080/api`).

## Deployment on Render

### Backend Service

- Create a **Web Service** on Render using the `backend` folder.
- Build command: `./mvnw clean package -DskipTests`
- Start command: `java -jar target/employee-hrms-0.0.1-SNAPSHOT.jar`
- Set environment variables:
  - `DB_URL`, `DB_USER`, `DB_PASSWORD` (from Aiven MySQL connection string).

### Frontend Service

Option 1: Static Site

- Build command: `npm install && npm run build`
- Publish directory: `frontend/dist`
- Set environment variable `REACT_APP_API_URL` to backend URL.

Option 2: Web Service

- Use `npm install && npm run build && npx serve -s dist` start command.

## Project Structure

```
root
 ├ backend (Spring Boot, packages under `com.hrms`)
 └ frontend (React + Vite, pages/components)
```

## Notes

- CORS is enabled for all origins during development via `CorsConfig`.
- Authentication is mocked; login simply stores a name in local storage.
- Modify `application.properties` or environment variables as needed.

Enjoy building and deploying your Employee HR Management System!
