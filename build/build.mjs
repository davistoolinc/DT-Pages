import fs from 'node:fs/promises'; import pth from 'node:path'; import process from 'node:process';
import strip from 'strip-comments';
const root = pth.join(process.argv[1], '../..'), isCF = process.argv[1].startsWith('/opt/buildhome/'),
	buildMS = Date.now(), htmlCommRx = /<!--(?!-|>)(?:[^<-]|<(?!!--(?!>))|-(?!-!>))*?(?<!<!-)-->/g,
	excludedFolders = ['node_modules', '.git', '.github', '.vscode', 'functions', 'build'],
	excludedExts = [
		// media
			'png', 'webp', 'jpg', 'mp4', 'ico', 'xbs',
		// font
			'ttf', 'woff', 'woff2', 'otf',
		// text
			'md', 'cjs', 'csv', 'TODO'
	],
	deleteFile = [
		item => item[0] === '.',
		item => item === 'package.json',
		item => item === 'todo',
		item => item === 'package-lock.json',
		item => item === 'build.mjs',
		item => item.endsWith('.md')
	];
console.log('build.mjs', root, 'isCF=' + isCF, process.argv);
const buildOutput = {
	time: buildMS, timePST: new Date(buildMS).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
	version: process.version,
	files: []
};
async function save(path, newContent, oldContent) {
	const savePath = isCF ? path : pth.join(root, 'build', 'output', pth.relative(root, path));
	isCF || await fs.mkdir(pth.join(savePath, '..'), { recursive: true });
	return oldContent === newContent || fs.writeFile(savePath, newContent, 'utf8');
}
async function processFile(path) {
	const ext = (['mjs', 'js', 'css', 'html'].some(e => path.endsWith(`.${e}.txt`)) ? path.slice(0, -4) : path) // FlightDeck ships client assets as txt files, which still need comments stripped and build injected in HTML. If such a file is found, splice off the .txt ending and act according to the "secondary" extension
		.split('.').at(-1);
	buildOutput.files.push(path.slice(root.length));
	if (path.includes('.min.')) { return; } // console.log('minified file', path); }
	if (excludedExts.includes(ext)) { return; } // console.log('excluded extension', path); }
	console.log('processFile', path.slice(root.length));
	const oldContent = await fs.readFile(path, 'utf8'); let newContent;
	if (['mjs', 'js', 'css'].includes(ext)) { newContent = `/* ${buildMS} */\n${strip(oldContent, { preserveNewlines: true })}`; } // strip-comments doesn't appear to support HTML comments, as it claims
	else if (ext === 'html') { newContent = await processHTML(oldContent, path, true); }
	await save(path, newContent || oldContent, oldContent);
}
	function rxSplit(s, rx) {
		return [...s.matchAll(rx)].concat({ index: s.length }).flatMap(function addMatch(x, i, a) {
			const prev = a[i - 1] || { 0: '', index: 0 }; // need the length of the complete match (to skip inclusion in the strings) and the index (as end of previous string, and index + length = start of next)
			return [ // return an array of string before current match, and match object. This will be flatMap'ed into an array of Strings and Objects (matches)
				s.slice(prev.index + prev[0].length, x.index), // return string before current match (even if empty - will be filtered out)
				x[0] && x // return match Object. String.split() won't give you this match object, and String.replace() gives you back a single string, where matches are not separated from non-matches
			].filter(Boolean); // the last entry is index=s.length, so that the string after last match is included. But, that entry is not a match, [0] will be undefined, and should be filtered out
		});
	};
	async function processHTML(oldHTML, path, top) {
		async function transform(x) {
			if (typeof x === 'string') { return x; }
			const commentText = x[0].slice(4, -3);
			if (commentText.slice(0, 3) !== '${{' || commentText.slice(-2) !== '}}') { return ''; } // if we don't see the server-side template syntax, remove all "regular" HTML comments
			const file = pth.join(path, '..', commentText.slice(3, -2));
			return processHTML(await fs.readFile(file, 'utf8'), file);
		}
		return (top ? `<!-- ${buildMS} -->\n` : '') + (await Promise.all(rxSplit(oldHTML, htmlCommRx).map(transform))).join('');
	}
async function crawlDir(path) {
	console.log('crawlDir', path.slice(root.length) || '/'); const ls = { files: [], folders: [] };
	for (const item of await fs.readdir(path)) {
		const itemPath = `${path}/${item}`;
		if ((await fs.stat(itemPath)).isDirectory()) {
			if (excludedFolders.includes(item)) { continue; } // console.log('excluded folder', itemPath); continue; }
			await crawlDir(itemPath); ls.folders.push({ name: item, path: itemPath.slice(root.length) });
		}
		else if (isCF && deleteFile.some(fn => fn(item, path))) { await fs.rm(itemPath); console.log('deleted ' + itemPath); }
		else { await processFile(itemPath); ls.files.push({ name: item, path: itemPath.slice(root.length) }); }
	}
	await save(pth.join(path, 'ls.json'), JSON.stringify(ls, null, '\t'));
}
await crawlDir(root);
await save('buildOutput.json', JSON.stringify(buildOutput, null, '\t'));