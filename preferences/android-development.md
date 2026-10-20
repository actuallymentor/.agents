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

## Signing & distribution
- Play App Signing on. Ship ONE signature everywhere: sideload/website APK = Play's universal APK (Publishing API `generatedApks`, download needs `?alt=media`), so Play and website installs update each other. A different key on the same package forces a reinstall.
- Developer verification (2026+): register the package AND every signing key, including Play's own app signing key, before the first upload. Otherwise uploads fail at "Committing the Edit". Play's key verifies instantly from its SHA-256; keys you hold need a proof APK with `assets/adi-registration.properties`.
- Keystores never in git; CI decodes them from secrets. Verify the signer SHA-256 with `apksigner` before publishing anything.
- versionCode = CI run number, versionName = git tag `android-vX.Y.Z`. Publish only from CI.

## Play policy
- Play installs: no self-updates, no links to external checkout. Detect the installer via `getInstallSourceInfo` (`com.android.vending`) and gate both.
- Sideload updates: poll a JSON manifest, open the APK URL in the browser. No `REQUEST_INSTALL_PACKAGES`.
- Provide a store-review account that signs in with a fixed code and no email (keep rate limits).
- Target the latest API. Raising minSdk shows a "devices no longer supported" warning; that's expected.

## Play automation
- Service account with app-level Admin (never account-level). The API covers releases, tracks, listings, reviews and vitals. Policy forms, developer verification and support stay in the browser.
- Store listings live as files in the repo (`store/listings/<lang>.json`) and are pushed through the API. Every commit is sent for review, and pushing while a review runs restarts it.
- GitHub Actions masks `{` in logs when a JSON secret is set: print machine-readable output as base64.

## i18n
- `localeFilters` + `generateLocaleConfig` gives a per-app language picker. Indonesian is `in`. Send `Locale.getDefault().toLanguageTag()` to the backend.
- Bundled fonts are often Latin-only subsets. Subset the Google Fonts variable files to Latin, Latin Extended, Cyrillic and Vietnamese; Arabic uses the system font.
- `supportsRtl=true`; Compose mirrors layouts by itself. Wrap user values in `BidiFormatter.unicodeWrap`; keep codes and IDs left to right.
- Rephrase numeric placeholders so they work for any count, or use `<plurals>` (ru/pl/ar have several forms).

## Device testing
- Wireless adb. Some OEMs (OnePlus) freeze the Play Protect verifier while the screen is off, so `adb install` hangs: `svc power stayon true` during installs, revert after.
- Locale testing: `cmd locale set-app-locales <pkg> --locales ar`. A debug `applicationIdSuffix` lets debug and release coexist.
- `pm clear` may be blocked: reinstall to wipe data. Secure screens (PIN, lock screen) screenshot as black.
- Restore every setting you toggle on the device (unknown sources, stay-awake).
