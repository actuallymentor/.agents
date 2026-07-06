# Testing preferences

When writing tests, you approximate real user actions as closely as possible.

- Prefer end to end testing over unit testing. You may create unit tests, but only to make sure complex logic is robust, it is not a source of truth for application stability
- Prevent stubbing as much as possible, if you cannot access a resource (e.g. sensors in browser) first see if the browser has build-in mocking (example, chromium has flags like `--use-fake-device-for-media-stream`). If you know of no native mocking options, browse the web for options
- Make an explicit effort to test real behaviour as it would be in production, for example if the application includes local LLM inference, you must really load the model and run inference
