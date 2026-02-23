# AgriLink Hub - Java Backend

## Setup Instructions

1. **Install MySQL**
   ```bash
   # Import database schema
   mysql -u root -p < database/schema.sql
   ```

2. **Configure Database**
   - Update `src/main/resources/application.properties` with your MySQL credentials

3. **Run Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. **API Endpoints**
   - POST `/api/auth/login` - User login
   - POST `/api/auth/signup` - User registration

5. **Test Users**
   - farmer@test.com / password123
   - expert@test.com / password123
   - admin@test.com / password123
   - public@test.com / password123

Backend runs on: http://localhost:8080
