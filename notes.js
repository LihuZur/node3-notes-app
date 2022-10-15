const chalk = require('chalk')
const fs = require('fs')

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("new node added!"))
    }  
    else{
        console.log(chalk.red.inverse("note title taken!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newArr = notes.filter((note) => note.title != title)

    if(newArr.length === notes.length){
        console.log(chalk.bgRed("No note found!"))
    }
    else{
        console.log(chalk.bgGreen("Note removed!"))
        saveNotes(newArr)
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your Notes"))
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)

    if(foundNote){
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    }

    else{
        console.log(chalk.red.inverse("Note not found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}