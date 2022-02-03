# test-dev-sogeti
Repository with Sogeti's development exam task. It can be visualized on [GitHubPages](https://pedrovandrade.github.io/test-dev-sogeti/) through a static (no back-end) version of the code, as GitHub Pages doesn't execute server code.

## Start script
Before start executing the application, it's necessary to install the dependencies. Simply enter the command:
```
npm install
```

To execute the program on dev mode (Unix systems only), enter command:
```
npm run start:dev
```
For prod (Unix systems only), the command is:
```
npm start
```

For non-Unix systems, the commands for bundling and running the application must be done separately in different terminals. For dev:
```
npm run dev:bundler
```
```
npm run dev:server
```

Finally, for prod:
```
npm run prod:bundler
```
```
npm run prod:server
```
