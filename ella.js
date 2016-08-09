// Native modules
var path = require("path");
// local modules
var Util = require("util");
var Bot = require("./lib/irc");
var profile = require("./ella-profile");
var Sandbox = require("./lib/sandbox");
var Shared = require("./shared");
// NPM modules
var request = require("request");
var cheerio = require("cheerio");

var urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

var Ella = function(profile) {
	Bot.call(this, profile);
	this.set_log_level(this.LOG_ALL);
	this.set_trigger("!"); // Exclamation
};

Util.inherits(Ella, Bot);

Ella.prototype.init = function() {
	Bot.prototype.init.call(this);
	this.sandbox = new Sandbox(path.join(__dirname, "ecmabot-utils.js"));
	this.executeRegex = /^((?:sm?|v8|js?|b|n|>>?|>>>>|\|)>)([^>].*)+/;

	this.register_command("ping", this.ping);

	this.register_listener(this.executeRegex, Shared.execute_js);

	this.on('command_not_found', this.unrecognized);

	/* scan messages for links and print titles */
	this.on("message", function(context, text, msg) {
		var channel = context.client.get_channel(context.name);
		/* request only deals with urls which begin with http(s) */
		if (msg.match(urlRegex) && msg.match(/^http[s]?/)) {
			/* Make request to URl and get the title */
			var url = msg.match(urlRegex)[0];
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(body);
					var title = $("title").text().trim().replace(/\r?\n/, " ");
					if (title) channel.send("Title: " + title); // Don't bother showing a title if its empty
				}
			});

		};
	});
};

Ella.prototype.ping = function(cx, text) {
	cx.channel.send_reply (cx.sender, "Pong!");
};

Ella.prototype.unrecognized = function(cx, text) {
	cx.channel.send_reply(cx.sender, "There is no command: "+text);
};

(new Ella(profile)).init();