# Funds in & out 💸 📈

This is a simple app to help me manage my daily incomes and expenses.

## Get started

1. Install dependencies.

   ```bash
   yarn install
   ```

2. Set the environment variables clonning the `.env.template` file and renaming it to `.env`. Then, fill in the variables with your own values.

   ```bash
   cp .env.template .env
   ```

   > [!NOTE]
   > This project uses [supabase](https://supabase.com/) as a backend, so you'll need to create an account and a project to get the values for the `SUPABASE_URL` and `SUPABASE_API_KEY` variables. Those can be found in your project Home tab. **The schema used on the project can be found in the file `.db_schema_v1` of this repo.**

   2.1. In case you want to update the supabase DB types you can use the following command:

   ```bash
   yarn supabase gen types --lang=typescript --project-id "fzmrmnsgdaesebjvrsbf" --schema public > ./app/api/supabase.types.ts
   ```

   > [!WARNING]
   > This command will overwrite the file `./app/api/supabase.types.ts` with the new schema and add two lines of code at the beginning of the file and one at the end. **Make sure to delete those lines as they are not valid typescript code.**

3. Start the app
   ```bash
   yarn dev
   ```

This app uses [Expo](https://docs.expo.dev/) so in the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
