import fs from 'fs';

export function getAllFilesFromDirectory(dirname: string) {
    return fs.promises.readdir(dirname).then(files => {
        return files;
    });
}