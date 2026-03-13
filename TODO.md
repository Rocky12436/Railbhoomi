# RailBhoomi Firebase Migration & Fix Plan\n\n## Current Progress: 11/12 [✅✅✅✅✅✅✅✅✅✅⬜⬜]\n\n1. [✅] Update package.json: Remove mongoose/mongodb, add firebase-admin@latest\n2. [✅] Execute `npm install` to update dependencies\n3. [✅] Create firebaseConfig.js for Admin SDK init\n4. [✅] Add .env.example with Firebase env vars\n5. [✅] Create firebase-service-account-key.json.example template\n6. [✅] Refactor server.js: Remove Mongoose, inline schemas; use Firestore queries; add bcrypt hashing\n7. [✅] Delete models/ directory (no longer needed)\n8. [✅] Create/Update .gitignore\n9. [✅] Update README.md with Firebase setup instructions\n10. [✅] Ensure src/uploads directory exists\n11. [ ] Test: npm start, check endpoints
2. [ ] Execute `npm install` to update dependencies
3. [ ] Create firebaseConfig.js for Admin SDK init
4. [ ] Add .env.example with Firebase env vars
5. [ ] Create firebase-service-account-key.json.example template
6. [ ] Refactor server.js: Remove Mongoose, inline schemas; use Firestore queries; add bcrypt hashing
7. [ ] Delete models/ directory (no longer needed)
8. [ ] Create/Update .gitignore
9. [ ] Update README.md with Firebase setup instructions
10. [ ] Ensure src/uploads directory exists
11. [ ] Test: npm start, check endpoints (user provides Firebase creds)
12. [ ] GitHub prep: git init, commit, push

**Notes:**
- User needs to: Create Firebase project, download serviceAccountKey.json, rename to firebase-service-account-key.json, set env vars.
- Test endpoints: POST /submit-complaint, GET /complaints, /register, /login, /setup-department-users

After each step complete, I'll update this file.

