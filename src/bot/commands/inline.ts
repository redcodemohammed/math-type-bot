import { TelegrafContext } from "telegraf/typings/context";
import math2svg from "../../services/math2svg";
import svg2img from "svg2img";

export default async (ctx: TelegrafContext) => {
	let math = ctx.inlineQuery.query;
	math = math.replace(/\s/g, "");

	try {
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
		svg2img(
			svg,
			{
				quality: 100,
				width: width * 50,
				height: height * 50
			},
			async (err, buffer: Buffer) => {
				if (err) throw err;
				let img = await ctx.telegram.sendPhoto("-1001340374468", {
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
};
