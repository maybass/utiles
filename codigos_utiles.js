CODIGOS UTILES 



//codigo para mantener la conecion con la base de datos viva y q no se cierre 

setInterval(()=> {
	connection.query('SELECT 1');
	console.log('manteniendo viva la conexion')
	
	
}, 50000)


//codigo para conectar la base de datos en un archivo aparte de app.js , creo uno nuevo db.js en el mismo directorio de app.js

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
})

connection.connect((err)=> {
	if(err) throw err
	console.log('Base de datos esta conectada')
})


module.exports =  connection 


//hbs parciales
//codigo necesario para conectar parciales, dentro de carpeta views creo una carpeta partials y ahi dentro los archivos de partials

hbs.registerPartials(__dirname + '/views/partials')


//para conectar archivos hbs de una 
app.set('view engine', 'hbs');

//para q m tome archivos q esten dentro de views pero dentro de otras carpetas BACK Y FRONT
//PARA PODER SEGUIR MANEJANDOLOS COMO 'INDEX', 'PRODUCTOS' sin la necesidad de establecer ruta especifica y detallada, lo busca solo 
//requiero path para poder hacerlo, codigo abajo
//se necesita requerir a path.  const path = require('path')
app.set('views', [
	path.join('./views/front'),
	path.join('./views/back'),
	path.join('./views')//NECESARIO MUY NECESARIO PARA Q ENCUENTRE EL 404 Q ESTA FUERA DE BACK Y FRONT
]) 




//archivos estaticos en carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')))// para asegurarme q va a conectar desde la ruta absoluta(carpeta donde esta mi proyecto)
//dir name conecta con la ruta absoluta d mi proyecto

// lo mismo q el anterior pero sin la certeza de dirname
app.use(express.static('public'))


//middleware
//codigo necesario para leer req.body 
// req.params para url, ver mas tarde
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));


//middleware 404 , debajo de todas las rutas , antes del app.listen(3000)

app.use((req,res, next)=> { // con o sin next
	res.status(404).render('404' , {
		titulo: '404 -Not Found'
	});
})



//helpers

let temperatura  ;
let sensacionTermica ;

axios.get('URL API')
.then((res)=> {
	//lo primero es imprimir lo q nos trae la API, luego obtener el objeto, agarrarlo con [0] . o como corresponda 
	//lo primero es capturar el objeto o la propiedad o lo q necesite en una variable 
	// lo mismo con let sql , params, req.body , capturarlo en una variable para poder manejarlo , guardarlo en una 
	temperatura = res.data.temp_c;
	sensacionTermica = res.data.feelslike_c;
	console.log(res.data.feelslike_c)
	console.log(temperatura)
})

.catch((err)=> {
	
	console.log("Error Axios Climate" , err)
})




hbs.registerHelper('temperaturaActual' , (temp) => {
	console.log("LA TEMPERATURA ES DE : " + temperatura)
	return temperatura;
	
})// en el archivo hbs utilizare {{temperaturaActual temp}}
// para mas complejos {{#temperaturaActual}} {{this}} {{/temperaturaActual}} usar como iteradoras a las variables sin each