//deps
let express= require('express');
let methodOverride= require('method-override');
let bodyParser= require('body-parser');
let exphbs= require('express-handlebars');
let routes= require('./routes/handlers');
const port= process.env.port || 9001;
let app= express();

//bodyparser+methodOverride
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

//handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars',exphbs({defaultLayout: 'main'}));

app.use('/',routes);

app.listen(port, () => {
    console.log(`server is starting at port ${port}`)
})