import { TelegrafContext } from "telegraf/typings/context";
import math2svg from "../../services/math2svg";
import algebrite from "algebrite";
import svg2img from "svg2img";

export default async (ctx: TelegrafContext) => {
	let math = ctx.message.text.substr(1);
	math = math.replace(/\s/g, "");

	math = algebrite.run(math);

	try {
		let svg = await math2svg(math);
		let width = +svg.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
		let height = +svg.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
		if (width > 40) ctx.reply("The expression is too long :(");
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
};
