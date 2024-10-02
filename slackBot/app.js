require('slack').config();  // Load environment variables from .env file
const { App } = require('@slack/bolt');

// Initialize the Slack app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,           // Bot User OAuth Token from .env
  signingSecret: process.env.SLACK_SIGNING_SECRET, // Signing Secret from .env
});

// Example event listener: Listens for "hello" keyword and responds with a message
app.message('hello', async ({ message, say }) => {
  await say('Hey theree, <@${message.user}>!');
});

// Example command listener: Listens for the /greet command
app.command('/greet', async ({ command, ack, say }) => {
  await ack();  // Acknowledge the command request
  await say('Hello, <@${command.user_name}>! How can I assist you today?');
});

// Start the Slack app and listen on port 3000
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Slack bot is running!');
})();