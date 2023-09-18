# Marvel Comics React App

This is a mini React app that uses public `Marvel Comics API` as backend.

## Marvel Developer Portal & API Keys

To run this mini app, first sign up and obtain `public key` and `private key` from Marvel Developer Portal:
https://developer.marvel.com/documentation/generalinfo

Then create `.env` file at the root directory with this content:

```
REACT_APP_PUBLIC_KEY=YOUR_PUBLIC_KEY
REACT_APP_PRIVATE_KEY=YOUR_PRIVATE_KEY
```

## Available Scripts

I recommend to use `yarn` as package manager due to its better dependency resolution

- execute `yarn` to install the dependencies
- execute `yarn start` to run the application at localhost
- execute `yarn test` to run the unit tests
