import { Telegraf } from "telegraf";

import math from "./commands/math";
import inline from "./commands/inline";
import simplify from "./commands/simplify";
import int from "./commands/int";
import solve from "./commands/solve";
import derivatives from "./commands/derivatives";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.help((ctx) => {
	ctx.reply(
		"Here is list of the available commands:\n" +
			"- sim <expression> to simplify that expression.\n" +
			"- int <expression> to find the indefinite integral. (some math function are not supported such as sec and csc).\n" +
			"\n- der <expression> to find the derivative.\n" +
			"- sol <math equation> to solve it.\n" +
			"Please read this to learn how to write the expression http://asciimath.org/#syntax`"
	);
});

bot.command("sim", simplify);
bot.command("int", int);
bot.command("sol", solve);
bot.command("der", derivatives);

bot.on("inline_query", inline);
bot.on("text", math);

bot.launch();
