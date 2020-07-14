import { Telegraf } from "telegraf";

import math from "./commands/math";
import inline from "./commands/inline";
import simplify from "./commands/simplify";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.help((ctx) => {
	ctx.reply(
		"Please read this to learn how to use the bot http://asciimath.org/#syntax"
	);
});

bot.command("simplify", simplify);

bot.on("inline_query", inline);
bot.on("text", math);

bot.launch();
