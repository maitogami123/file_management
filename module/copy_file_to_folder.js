const fs = require('fs');
const path = require('path');

function createFolder(folderPath) {
    let stat = fs.statSync(folderPath, {throwIfNoEntry: false})
    if (!stat) {
        fs.mkdirSync(folderPath)
    }
}

function moveFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
    })
}

function createBackup(oldPath) {
    const backupPath = './backup'
    let stat = fs.statSync(backupPath, {throwIfNoEntry: false})
    if (!stat) {
        fs.mkdirSync(backupPath)
    }
    fs.readdirSync(oldPath).forEach(file => {
        let fileStat = fs.statSync(path.join(oldPath, file), {throwIfNoEntry: false})
        if (fileStat.isFile()) {
            let from = path.join(oldPath, file)
            let to = path.join(backupPath, file)
            fs.copyFileSync(from, to)
        }
    })
}


module.exports = {
    moveFile,
    createBackup,
    createFolder
};