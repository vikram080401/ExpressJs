const fs = require('fs');
const readline = require('readline');
const filename = 'filenames.txt';

const writeToFile = (name) => {
    name += '\n';



    fs.readFile(`${filename}`, function (err, data) {
        if (err) {
            console.log('File does not exist !');
        }
        if (data.includes(name)) {
            console.log("Filename exists, please try again ")
        }
        if (!data.includes(name)) {
            fs.appendFile('filenames.txt', `${name}`, err => {
                if (err) {
                    console.log('An Error occurred when writing to file')
                }
            });
            fs.writeFile(`${name}`,'You are awesome',err=>{
                console.log('An Error occurred when writing to file')
            });
        }

    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Please provide filename !', (name) => {
    rl.close();
    upsertFile(`${filename}`, name);


});

async function upsertFile(name, name2) {
    try {
        // try to read file 
        await fs.promises.readFile(name)

    } catch (error) {
        // create empty file, because it wasn't found
        await fs.promises.writeFile(name, '')
    }
    writeToFile(name2);
}

