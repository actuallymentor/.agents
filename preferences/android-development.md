When developing for Android devices, I expect you to default to expo (react-native) unless there is a strong reason not to.

- All your android apps will also use expo-web
- You may use the web version to preview your edits, do end to end testing, and then push them to the Android device for real testing
- You are expected to connect to a real android device on the local network, use `adb` to find it
  - this device is a dirty dev device, you may do anything on it without asking for permission, it's sole purpose is for development and testing
  - this device is a physical device, not an emulator
- You may receive email on `GMAIL_SMTP_USER` which you can read using `GMAIL_SMTP_APP_PASSWORD`
  - You are cleared to use this to test things like logging in with email for the app you are building
  - this inbox is used by multiple LLMs so make sure you only read what is relevant to you
  - If I ask you to create an account somewhere, you may use this email address for that purpose, and receive activation links and the like on it
  - You are NOT cleared to send emails from that address.
