const fs = require('fs');

class UsersRepository{
    constructor(filename){
        if(!filename){
        throw new Error('Creating a repository requires a filename');
        }

       this.filename = filename;
       try{
        fs.accessSync(this.filename);
       }catch(err){
        fs.writeFileSync(this.filename,'[]');
          }
    }

    async getAll(){
        //open file called this.filename
        const contents = await fs.promises.readFile(this.filename, {encoding:'utf8'});
        //read contents
        console.log(contents);
        //parse contents
        const data = JSON.parse(contents);
        //return parsed data
        return data;
    }
 }

const test = async() => {
    const repo = new UsersRepository('users.json');

    const users = await repo.getAll();

    console.log(users);
    };
test();