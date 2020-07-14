import { Telegraf } from "telegraf";

import math from "./commands/math";
import inline from "./commands/inline";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.help((ctx) => {
	ctx.reply(
		"Please read this to learn how to use the bot http://asciimath.org/#syntax"
	);
});

bot.on("inline_query", inline);
bot.on("text", math);

bot.launch();
