import { Telegraf } from "telegraf";
import math2svg from "../services/math2svg";
import svg2img from "svg2img";

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

bot.help((ctx) => {
	ctx.reply(
		"Please read this to learn how to use the bot http://asciimath.org/#syntax"
	);
});

bot.on("inline_query", async (ctx) => {
	let math = ctx.inlineQuery.query;
	math = math.replace(/\s/g, "");
	let svg = await math2svg(math);

	let width = +svg.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
	let height = +svg.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];

	if (width > 40)
		ctx.answerInlineQuery([
			{
				id: "0",
				type: "article",
				title: "The expression is too long :(",
				input_message_content: {
					message_text: "The expression is too long :("
				}
			}
		]);

	try {
		svg2img(
			svg,
			{
				quality: 100,
				width: width * 50,
				height: height * 50
			},
			async (err, buffer: Buffer) => {
				if (err) throw err;
				let img = await bot.telegram.sendPhoto("-1001340374468", {
					source: buffer
				});
				ctx.answerInlineQuery(
					[
						{
							id: "0",
							type: "photo",
							photo_file_id: img.photo[0].file_id
						}
					],
					{ cache_time: 3000 }
				);
			}
		);
	} catch {
		ctx.answerInlineQuery([
			{
				id: "0",
				type: "article",
				title: "Please send a valid MathML",
				input_message_content: {
					message_text: "Please send a valid MathML"
				}
			}
		]);
	}
});

bot.on("text", async (ctx) => {
	let math = ctx.message.text;
	math = math.replace(/\s/g, "");
	let svg = await math2svg(math);

	let width = +svg.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
	let height = +svg.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];

	if (width > 40) ctx.reply("The expression is too long :(");

	try {
		svg2img(
			svg,
			{
				quality: 100,
				width: width * 50,
				height: height * 50
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
