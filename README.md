# Github-Search-Bot [Under Construction]
-------

Purpose:
----
A slack slash command that will query github search api with the given command. Created to ask what are the open and closed pull request for the configured organization. Additional features have access to githubs filter strings.

Example Commands:

1. /pr open
2. /pr closed
3. /pr open 4
4. /pr org:nodejs is:pr author:orangemocha
5. /pr org:nodejs is:issue


How Slack-bot works:
-----
When a slash command is given to slack, they hit the configured server and endpoint. For example if you set the host as `slackbot.mydomain.com` and endpoint `/pr`, when a slash command is given, they hit `http://slackbot.mydomain.com/pr`.


Configuration:
------
In the config.js there is a property called command.name (/pr for example example). When configuring slash command in slack endpoint, enter command.name (/pr).


Setup:
------

Localhost:
To run the server locally that will talk to the remote slack servers, download and install [ngrok](https://ngrok.com/download). Ngrok will make a proxy that will hit your local computer DIRECTLY! This is meant for development only.

1. run (npm install)
2. Create a slash command in slack
3. Run ngrok service (ngrok http 3000)
4. Copy host and update the slack slash command url on slack.com
5. Start server with (npm start)
6. In slack  (/pr open)

The slack

Todo:
----

1. Generate token key so only configure owner can access the api
2. Make /pr help nicer
3. Add some tests
4. Updated README more
5. describe required configuration
