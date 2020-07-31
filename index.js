const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send(`
        <div>
        <form method="POST">
            <input name="Email" placeholder="Email"/>
            <input name="Password" placeholder="Password"/>
            <input name="Password Confirmation" placeholder="Password Confirmation"/>
            <button>Sign Up</button>
        </form>
        </div>
    `);
});



app.listen(3000, () => {
    console.log('listening');
});

const bodyParser = (request, response, next) => {
    if(request.method ==='POST'){
        request.on('data', data =>{
        const parsed = data.toString('utf8').split('&');
        const formData = {};
        for(pair of parsed){
            const [key,value] = pair.split('=');
            formData[key] = value;
            }
        request.body = formData;
        next();
        });
        }
     else{
        next();
     }
}


app.post('/', bodyParser, (request, response) =>{
    console.log(request.body);
    response.send("Account Created");
});