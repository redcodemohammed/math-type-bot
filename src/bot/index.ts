import { Telegraf } from "telegraf";
import math2svg from "../services/math2svg";
import svg2img from "svg2img";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.command("math", async (ctx) => {
	let math = ctx.message.text.split(" ").slice(1).join("");
	let svg = await math2svg(math);

	svg2img(
		svg,
		{ quality: 100, width: 25 * math.length, height: 8 * math.length },
		(err, buffer) => {
			ctx.replyWithPhoto({
				source: buffer
			});
		}
	);
});

bot.launch();
