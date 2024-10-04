# 3105-node-exercise

A basic backend application using Node.js and Express.js for my 3105 class.

[Click here to view Project Specifications](https://github.com/Luzefiru/3105-node-exercise/blob/main/.github/SPEC.md)

## Setup

```bash
git clone git@github.com:Luzefiru/3105-node-exercise.git
cd 3105-node-exercise
npm i
npm run dev
```

### Configuration

> [!TIP]
> Feel free to change the following configration values to play around with the behavior.

```ts
// config/env.ts
export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PORT: process.env.PORT || 3000,
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.MAX_REQUESTS) || 5,
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 30 * 1000, // 30 seconds
};
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
