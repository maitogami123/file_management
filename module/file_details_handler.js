const fs = require('fs');
const path = require('path');
const typeHandler = require('./type_handler')
const fileHandler = require('./copy_file_to_folder')

// Get file infomation
function readFiles(inputPath, actions) {
    fileHandler.createBackup(inputPath)
    fs.readdir(inputPath, (err, files) => {
        files.map(file => {
            let _path = path.join(inputPath, file)
            fs.stat(_path, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                if (stats.isFile()) {
                    let newPath;
                    let date = [
                        stats.mtime.getDate(),
                        stats.mtime.getMonth(),
                        stats.mtime.getFullYear()
                    ]
                    let fileInfo =  {
                        'name': path.basename(_path).split('.')[0],
                        'modifyDate': date,
                        'size': Math.ceil(stats.size/(1024)),
                        'ext': path.basename(_path).split('.')[1]
                    }
                    let typeArg = actions.filter(item => !item.includes('--')).length > 0 ? actions.filter(item => !item.includes('--')).toString().split(',') : undefined;
                    actions.filter(item => item.includes('--')).forEach(action => {
                        let fileType = typeHandler.handleType(fileInfo)
                        if (typeArg && typeArg.includes(fileType) || !typeArg) {
                            switch (action) {
                                case '--type':
                                    newPath = path.join(newPath ? newPath : inputPath, fileType)
                                    fileHandler.createFolder(newPath)
                                    break;
                                case '--modify':
                                    let modifyDate = typeHandler.handleModifyDate(fileInfo)
                                    newPath = path.join(newPath ? newPath : inputPath, modifyDate)
                                    fileHandler.createFolder(newPath)
                                    break;
                                case '--name':
                                    let dirName = typeHandler.handleName(fileInfo)
                                    newPath = path.join(newPath ? newPath : inputPath, dirName)
                                    fileHandler.createFolder(newPath)
                                    break;
                                case '--size':
                                    let fileSize = typeHandler.handleSize(fileInfo)
                                    newPath = path.join(newPath ? newPath : inputPath, fileSize)
                                    fileHandler.createFolder(newPath)
                                    break;
                                default:
                                    console.log(`Invalid action`)
                                    break;
                            }
                        }
                    })
                    if (newPath) {
                        fileHandler.moveFile(_path, path.join(newPath, fileInfo.name + '.' + fileInfo.ext))
                    }
                }
            });
        })
    })
}

module.exports = readFiles;