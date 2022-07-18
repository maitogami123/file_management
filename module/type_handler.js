const fs = require('fs');
const path = require('path');

function handleType(fileInfo) {
    switch (fileInfo.ext) {
        case 'jpg': case 'png': case 'jpeg':
            return 'image'
        case 'docx': case 'doc': case 'txt':
            return 'text'
        case 'sh':
            return 'bash'
        default:
            return 'others'
    }
}

function handleSize(fileInfo) {
    if (fileInfo.size < 100) {
        return 'tiny'
    } else if (fileInfo.size < 1000) {
        return 'small'
    } else if (fileInfo.size < 5000) {
        return 'medium'
    } else if (fileInfo.size < 10000) {
        return 'big'
    } else {
        return 'very big'
    }
}

function handleName(fileInfo) {
    let firstLetter = fileInfo.name.split('')[0].toUpperCase();
    if (firstLetter >= 'A' && firstLetter <= 'D')
        return 'A - D' 
    else if (firstLetter >= 'E' && firstLetter <= 'H')
        return 'E - H'
    else if (firstLetter >= 'I' && firstLetter <= 'L')
        return 'I - L'
    else if (firstLetter >= 'M' && firstLetter <= 'P')
        return 'M - P'
    else if (firstLetter >= 'Q' && firstLetter <= 'T')
        return 'Q - T'
    else
        return 'U - Z'
}

function handleModifyDate(fileInfo) {
    let currentDate = new Date(Date.now())
    currentDate = [
        currentDate.getDate(),
        currentDate.getMonth(),
        currentDate.getFullYear()
    ]
    if (fileInfo.modifyDate.join(' ') == currentDate.join(' '))
        return 'Today'
    else if (fileInfo.modifyDate[1] == currentDate[1] && fileInfo.modifyDate[2] == currentDate[2])
        return 'This month'
    else if (fileInfo.modifyDate[2] == currentDate[2])
        return 'This year'
    else 
        return 'Years ago'
}

module.exports = {
    handleType,
    handleName,
    handleSize,
    handleModifyDate
}