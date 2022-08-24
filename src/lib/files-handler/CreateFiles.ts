import fs from 'fs';
const { writeFileSync } = fs;

export async function createFile(path: string, data: any = []) {
    return await writeFileSync(path, JSON.stringify(data, null, 4));
}