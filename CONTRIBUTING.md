# Contributing

Thank you for taking the time to contribute. This repository is a frontend-only storefront demo; changes should keep it self-contained and avoid adding backend services, credentials, or real payment flows.

## Development setup

1. Install Node.js 18 or newer and npm.
2. Clone the repository and install dependencies:

   ```sh
   git clone https://github.com/BajrangVaishnav/E-commerce-website.git
   cd E-commerce-website
   npm install
   ```

3. Start the app with `npm start`.

## Before opening a pull request

- Keep changes focused and follow the existing React and styling patterns.
- Run `npm test -- --watchAll=false` and `npm run build`.
- Describe the behavior changed and include screenshots for visible UI changes.
- Do not add API credentials, `.env` files, real customer data, or payment integrations.
- Confirm you have the right to contribute any code, images, fonts, or other assets. Document third-party asset licenses and attribution where required.

## Pull requests

Open a pull request against `main` with a clear title and a concise summary of the change. Include relevant test results and note any limitations or follow-up work.

## License

By contributing, you agree that your contribution is provided under the repository's [PolyForm Noncommercial License 1.0.0](./LICENSE). This project is source-available and does not permit commercial use under that license.
