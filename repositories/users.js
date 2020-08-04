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
        //read contents
        //parse contents
        //return parsed data
    }
 }
const repo = new UsersRepository('users.json');