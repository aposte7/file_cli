import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function joinPath(filePath, dir = __dirname) {
	return path.resolve(dir, filePath);
}

export async function writeToFile(filePath, content = '') {
	const fullPath = joinPath(filePath);

	try {
		await fsPromises.mkdir(path.dirname(fullPath), { recursive: true });
		await fsPromises.writeFile(fullPath, content);
		console.log('✅ File written successfully!');
	} catch (err) {
		console.error('❌ Error writing file:', err.message);
	}
}

export async function readFile(filePath, encoding = 'utf-8') {
	const fullPath = joinPath(filePath);

	try {
		const data = await fsPromises.readFile(fullPath, encoding);
		console.log(`📖 Content of ${filePath}:\n${data}`);
	} catch (err) {
		console.error('❌ Error reading file:', err.message);
	}
}
