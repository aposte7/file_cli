import fsPromises from 'node:fs/promises';
import path, { join } from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function writeToFile(filePath, content = '') {
	const fullPath = joinPath(filePath, __dirname);
	const dirPath = path.dirname(fullPath);

	console.log(fullPath);

	try {
		await fsPromises.mkdir(dirPath, { recursive: true });
		await fsPromises.writeFile(fullPath, content);
		console.log('File written successfully!');
	} catch (err) {
		console.log(err.message || `error when writing to file`);
	}
}

async function readFile(filePath, encoded = 'utf-8') {
	const fullPath = joinPath(filePath);
	const dirPath = path.dirname(fullPath);
	const base = path.basename(filePath);

	try {
		const data = await fsPromises.readFile(
			joinPath(base, dirPath),
			encoded
		);
		console.log(data);
	} catch (err) {
		console.log(err.message || 'error while reading file');
	}
}

// writeToFile('file/yes//good.txt', 'Still ');
readFile('file/yes//good.txt');

function joinPath(paths, dir = __dirname) {
	return path.join(dir, paths);
}
