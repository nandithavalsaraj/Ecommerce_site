const express = require('express');
const bodyParser = require('body-parser');

const app = express();


/*Using the use function to automatically apply a middleware function to all requests */
/*To automatically parse the forms*/
app.use(bodyParser.urlencoded({extended: true}));

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


/*urlencoded  to specify that information obtained via html*/
app.post('/', (request, response) =>{
    console.log(request.body);
    response.send("Account Created");
});