# Development
Steps to start the app in development:

1. Start the database:
   ```bash
   docker compose up -d
      ```

2.    Rename .env.template to .env.
3.    Replace the environment variables.
4.	Run the SEED to create the local database.

npx prisma init
npx prisma migrate dev
npx prisma generate