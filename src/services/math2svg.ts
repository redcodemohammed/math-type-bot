import * as mjAPI from "mathjax-node";

mjAPI.config({
	MathJax: {
		// traditional MathJax configuration
	}
});

mjAPI.start();

export default (math: string): Promise<string> =>
	new Promise((resolve, reject) => {
		mjAPI.typeset(
			{
				math: math.replace(" ", ""),
				format: "AsciiMath", // or "inline-TeX", "MathML"
				svg: true // or svg:true, or html:true
			},
			function (data) {
				if (!data.errors) {
					resolve(data.svg);
				} else {
					reject(data.errors);
				}
			}
		);
	});
