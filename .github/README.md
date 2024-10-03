# 3105-node-exercise

A basic backend application using Node.js and Express.js for my 3105 class.

## Setup

```bash
git clone git@github.com:Luzefiru/3105-node-exercise.git
cd 3105-node-exercise
npm i
npm run dev
```

## Testing

```bash
# POST /register
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"username": "Test", "email": "test@gmail.com", "password": "test12345"}'

# POST /login
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username": "Test", "password": "test12345"}'

# GET /profile
curl -X GET http://localhost:3000/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiVGVzdCIsImlhdCI6MTcyNzk2NzU2NH0.TuajQYKGFf1vZratrfF2THSUFB25VBhNKNrOpbtyiEc"
```

## Built With

- [Node v20.17.0 LTS](https://nodejs.org/en/download/package-manager)
