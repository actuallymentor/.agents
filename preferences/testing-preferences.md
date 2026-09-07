# Testing preferences

When writing tests, you approximate real user actions as closely as possible.

Use the project's existing test tools and conventions unless the user specifies otherwise. Choose verification relevant to the change; these preferences do not require replacing the test stack.

- Prefer end-to-end testing over unit testing for user-facing behavior. Use unit tests to make complex logic robust; they do not establish application stability on their own
- Avoid stubbing where possible. If you cannot access a resource (e.g. sensors in a browser), first check the browser's built-in simulation or mocking support. If you know of no native options, browse the web for options
- Make an explicit effort to test real behaviour as it would be in production, for example if the application includes local LLM inference, you must really load the model and run inference
