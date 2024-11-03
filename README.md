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
yarn supabase gen types --lang=typescript --project-id "fzmrmnsgdaesebjvrsbf" --schema public > ./src/api/supabase.types.ts
```

> [!WARNING]
> This command will overwrite the file `./src/api/supabase.types.ts` with the new schema and add two lines of code at the beginning of the file and one at the end. **Make sure to delete those lines as they are not valid typescript code.**

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

## Create a Build

As this repo uses Expo, you can refer to the [Create your first build](https://docs.expo.dev/build/setup/#wait-for-the-build-to-complete) section in their documentation. For simplicity I used the recommended way to build the app using [EAS Build](https://docs.expo.dev/build/introduction/) for an android device.

> [!Tip]
> I recommend you to use this approach if you don't want to install Android Studio and all the dependencies to build the app in your local machine.

1. You will need to create an account in Expo and install the CLI.

   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account.

   ```bash
   eas login
   ```

3. Setup a configuration file for the build.

   ```bash
   eas build:configure
   ```

   This should generate a file called `eas.json` that looks like the `eas-template.json` file in the repo. They create a build profile for the app named `preview` **build.preview**. The diference between your `eas.json` and the `eas-template.json` file should be that preview profile has the environment variables option in it. **Don't forget to replace the values with your own**. Refer to this [link](https://docs.expo.dev/build-reference/variables/) to know how to set the environment variables in the build.

4. Just run the following command to start the build in Android.

   ```bash
   eas build -p android --profile preview
   ```

   or just the command in package.json I created for you.

   ```bash
    yarn android:build
   ```

   This will start the build process and you can check the status of the build in your **Expo dashboard**. At the end should provide you with a link and QR code to download the APK file on your device. In case you want to access the link days before just go to your builds from the Expo dashboard, you would see a install button that downloads the APK on your device.

### Production Errors

Anything is perfect and sometimes our build can crash. In case you get an error don't panic, I got too, so you can check the [Troubleshoot build errors and crashes](https://docs.expo.dev/build-reference/troubleshooting/) section to troubleshoot them.

First of all, you need to know if it is an Runtime error or a Build error. In a nut shell, a runtime error is an error that happens when the app is running or launched and a build error is an error that happens when the app is being built. If you have a build error you can check the logs in the Expo dashboard, if you have a runtime error you can check the logs in your device using the `adb logcat` command that **WOULD NOT** be pretty but you can find the error there (**that was how I know that in my first build the app was crashing do to not passing the ENVs to the build**). I refer this info from the [Expo production errors documentation](https://docs.expo.dev/debugging/runtime-issues/#production-errors).

```bash
adb logcat
```
