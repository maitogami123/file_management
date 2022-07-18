const path = require('path');
const fs = require('fs');
const readFiles = require('./file_details_handler');
const fileHandler = require('./copy_file_to_folder')

function argsChecker(args) {
    let consoleArgs = args.slice(2)

    if (consoleArgs[0].indexOf('./') == -1) {
        console.log("First argument must be a path")
        process.exit(1);
    } else if (!fs.existsSync(path.resolve(consoleArgs[0]))) {
        console.log("Directory does not exist: " + path.resolve(consoleArgs[0]))
        process.exit(1);
    } else if (path.resolve(consoleArgs[0]) == __dirname || path.resolve(consoleArgs[0]) == path.resolve(path.relative(__dirname, 'BasicProject'))) {
        console.log("These are source files, you cannot modify these files");
        process.exit(1);
    }
    
    // Missing arguments
    if (consoleArgs.length < 2) {
        console.log("You must enter at least 1 optional argument")
        process.exit(1);
    }
    if (consoleArgs.length > 4) {
        console.log("You've entered too much optional argument!");
        process.exit(1);
    }
    inputPath = consoleArgs.shift(1)
    if (inputPath.includes('module')) {
        console.log("You cannot modify module folder!")
    }

    let stats = fs.statSync(inputPath) 
    if (stats.isFile()) {
        if (!consoleArgs.includes('--output') || consoleArgs.length > 2) {
            console.error("You are modifying a file, please specify only --output and output path")
            process.exit(1);
        } else if (consoleArgs[consoleArgs.indexOf('--output') + 1]) {
            let outputPath = consoleArgs[consoleArgs.indexOf('--output') + 1]
            if ( !fs.existsSync(path.resolve(outputPath))) {
                console.log("Directory does not exist: " + path.resolve(outputPath))
                process.exit(1);
            } else {
                console.log(inputPath, path.join(outputPath, path.basename(inputPath)))
                fileHandler.moveFile(inputPath, path.join(outputPath, path.basename(inputPath)))
            }
            process.exit(1);
        } else {
            console.error("You are modifying a file, please specify output path")
            process.exit(1);
        }
    } else {
        readFiles(inputPath, consoleArgs)
    }
}
module.exports = argsChecker;