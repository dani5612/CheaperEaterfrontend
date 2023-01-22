# How to run

1. Download and install the latest version of node 16 for your operating system
    - https://nodejs.org/download/release/v16.19.0/
2. Install git:
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
3. Authenticate your Github account with Git:
    - https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git
4. Clone this repo using your command line
    - `git https://github.com/cheaper-eater/frontend.git`
5. Build and run:
    - in your command line, navigate to the project directory you cloned
    - once in your projectory navigate to `cheaper-eater`
    - install project dependencies: `npm install`
    - install web support dependencies: `npx expo install react-native-web@~0.18.7 react-dom@18.0.0 @expo/webpack-config@^0.17.0`
    - build tailwind css classes: `npm run build:tailwind`
    - run with `npm run web`
