const fs = require('fs');
const crypto = require('crypto');

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
/*
    async getAll(){
        //open file called this.filename and read contents
        //return the parse contents
        return  JSON.parse(
            JSON.stringify(
                await fs.promises.readFile(this.filename, {
                encoding:'utf8'
                })
               ));
    }
*/

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8'
      })
    );
  }
  /*
    async create(attrs){
         attrs.id = this.randomId();
        //sttributes are email and password
        //need to be update the user file
        const records = await this.getAll();
        records.push(attrs);
        //write up updated file data to the file
        await this.writeAll(records);
        }
*/
  async create(attrs) {
    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);
  }
    async writeAll(records){
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2)
        );
    }
randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }
  async delete(id) {
      const records = await this.getAll();
      const filteredRecords = records.filter(record => record.id !== id);
      await this.writeAll(filteredRecords);
    }
}




const test = async() => {
    const repo = new UsersRepository('users.json');
  //  await repo.create({email:'test@test.com', password:'password'});
   // const users = await repo.getAll();
   //const user = await repo.getOne('1123123123');
    //console.log(user);
    await repo.delete('1d908e76');
    };
test();