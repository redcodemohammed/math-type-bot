import { Telegraf } from "telegraf";
import math2svg from "../services/math2svg";
import svg2img from "svg2img";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.on("text", async (ctx) => {
	let math = ctx.message.text;
	math = math.replace(/\s/g, "");
	let svg = await math2svg(math);

	try {
		svg2img(
			svg,
			{
				quality: 100,
				width: math.length > 15 ? 50 * math.length - 800 : 200,
				height: math.length > 15 ? 8 * math.length : 100
			},
			(err, buffer) => {
				if (err) throw err;
				ctx.replyWithPhoto({
					source: buffer
				});
			}
		);
	} catch {
		ctx.reply("Please send a valid MathML");
	}
});

bot.launch();
