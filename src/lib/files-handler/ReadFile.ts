import fs from 'fs';

export async function getDataArrayFromFile(path: string) {
    try {
        const data = await getDataBufferFromFile(path);
        return (data.length == 0) ? [] : (await JSON.parse(data.toString()));
    } catch (err) {
        throw new Error(err)
    }
}

async function getDataBufferFromFile(path: string) {
    return await fs.readFileSync(path);
}

export async function getDataObjectFromFile(path: string, especificKey = '') {
    try {
        const data = await getDataBufferFromFile(path);        
        if (especificKey != '') {
            return (data.length == 0) ? null : (await JSON.parse(data.toString()))[especificKey];
        }

        return (data.length == 0) ? {} : (await JSON.parse(data.toString()));
    } catch (err) {
        throw new Error(err)
    }
}