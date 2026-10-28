When developing for iOS devices, I expect you to default to expo (react-native) unless there is a strong reason not to, e.g. app extensions like a Network Extension. Then go native SwiftUI.

- There is no Mac. Every compile happens on GitHub Actions `macos-*` runners, so push to a branch to build. Batch changes and read Swift carefully before pushing, because a build round trip takes 3-5 min
- You are expected to connect to a real iPhone on the local network: `pymobiledevice3` (lockdown over LAN) for install, syslog, crash reports and processes, and WebDriverAgent (`facebook-wda`, port 8100) for taps, typing and screenshots
  - this device is a dirty dev device, you may do anything on it without asking for permission, its sole purpose is development and testing
  - this device is a physical device, not a simulator. Developer Mode is on
- Email login testing: same rules as Android (`GMAIL_SMTP_USER`, read only, never send)

## Project & CI
- XcodeGen `project.yml` in git, `.xcodeproj` gitignored and generated in CI (`brew install xcodegen && xcodegen`).
- Workflow `on.push`: `tags:` without `branches: ['**']` = branch pushes never trigger. Set `defaults.run.shell: bash`, otherwise there is no pipefail and `| xcbeautify` hides archive failures.
- `gh run list --workflow x.yml` 404s for a workflow that only exists on a non-default branch: filter `gh run list --branch` by `workflowName`.
- Pin the toolchain (Xcode via the runner image, Go/Swift package versions). Upstream Swift packages from before 2024 often need `swift-tools-version` ≥5.7 and missing `#include`s on current Xcode; vendor and mark patches.
- Build a dev IPA (`-exportArchive` method `debugging`) on every push and upload it as an artifact; a device script fetches the latest successful run and installs it.
- CFBundleShortVersionString = git tag `ios-vX.Y.Z`, CFBundleVersion = CI run number. TestFlight only from CI on tags.

## Signing & distribution
- Manual signing in CI. Secrets: team ID, dev + distribution `.p12` (base64) + password, dev + App Store profile per bundle ID (app and each extension), ASC API key (`.p8`, key ID, issuer ID). Raw files live in a gitignored folder; never echo values into chat or logs.
- CI keychain: create, `set-keychain-settings -lut`, unlock, import with `-T /usr/bin/codesign`, `set-key-partition-list -S apple-tool:,apple:`, then add it to `list-keychains` (codesign only searches there). Copy profiles into both `~/Library/MobileDevice/Provisioning Profiles` and `~/Library/Developer/Xcode/UserData/Provisioning Profiles`, and pass the profile *names* as build settings. Delete the keychain in an `if: always()` step.
- App Groups + a shared Keychain access group for secrets the app and its extension both need. Keep secrets out of `providerConfiguration` and UserDefaults.
- The Keychain survives uninstall: wipe app secrets on first launch (UserDefaults flag).
- Verify an IPA without a Mac: unzip it, `openssl smime -verify -noverify` on `embedded.mobileprovision` (type, entitlements, `DeveloperCertificates`), and extract the CMS blob (`0xfade0b01`) from the Mach-O to check which cert signed it.
- The ASC API works from Linux: sign an ES256 JWT with node `crypto.sign(..., { dsaEncoding: 'ieee-p1363' })`. It covers certs, bundle IDs, profiles (create, download, delete) and builds.
- `altool` validation errors can be misleading. ITMS-90165 "Missing code-signing certificate" with verified-correct signing → check account type and entitlements before regenerating anything.

## App Store policy
- No self-updates and no links to external checkout. Hide "update" and "go premium" UI on iOS.
- VPN apps (Network Extension) require an Organization developer account to ship on the App Store. Check the account type before planning a release.
- Provide an App Review account that signs in with a fixed code and no email.
- `ITSAppUsesNonExemptEncryption` in Info.plist avoids the export-compliance prompt for every build.

## Network Extension
- After reinstalling over a recent tunnel, the extension fails with "Launchd job spawn failed" / "Plugin failed". Kill `neagent` (DVT process kill) after every install; uninstalling doesn't help.
- iOS 16: included routes without a default route leave the extension itself with no route to the internet. Route `0/0` and put LAN ranges and server endpoints in `excludedRoutes`.
- A fresh start can route the provider's own sockets into its own tunnel (traffic loop). Re-apply the tunnel settings about 1 s after start. Verify with server-side byte counters, never the phone's alone.
- `saveToPreferences` while connected can drop a start ("Updating" state): skip unchanged saves and retry `startVPNTunnel`.
- Logs: `<Extension>[pid]` in the device syslog. `.debug` is hidden in the syslog relay, so raise the level temporarily while debugging.

## SwiftUI
- Dialogs/alerts with an item: use the `presenting:` API. An `isPresented` setter clears the item before the button action runs.
- Variable fonts: refer to named instances by PostScript name ("Nunito-SemiBold"); family lookups pick the wrong weight.
- A full-bleed background needs the status bar area painted explicitly (`.ignoresSafeArea(edges: .top)` overlay).

## i18n
- `Localizable.strings` per `.lproj` plus `CFBundleLocalizations` in Info.plist; that also enables the per-app language picker in iOS Settings (link there via `openSettingsURLString`). Generate the strings from the Android `strings.xml` with a script that has a `--check` mode, and keep iOS-only overrides in one JSON file.
- Wrap user values in Unicode isolates (`\u{2068}…\u{2069}`) for RTL.

## Device testing
- WDA `send_keys` into email fields can trigger "Hide My Email" suggestions: set the element value directly, verify it, and dismiss the keyboard via the return key.
- Terminate the app via WDA before installing, or the install can hang. Show install progress.
- WDA calls right after a VPN connect can time out once; retry before concluding anything. Keep "Allow LAN" on, or the tunnel cuts off WDA.
- Restore every setting you toggle on the device, and leave it signed in or out the way you found it.
