# aragon-issue-tracker-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that finds duplicated links on newly opened issues.

## Setup

Configure your `.env` file. Instructions can be found in `.env.example`.

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

Open `https://github.com/apps/[name of your github app]` and click install. Select the repository you want to use and accept.

## Deployment
Install now. `npm install -g now`

```
 $ now -e APP_ID=aaa \
     -e WEBHOOK_SECRET=bbb \
     -e NODE_ENV=production \
     -e PRIVATE_KEY_BASE64="$(cat ~/Downloads/*.private-key.pem | base64)"
```

## Contributing

If you have suggestions for how this bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Demian Rodriguez <demian85@gmail.com>
