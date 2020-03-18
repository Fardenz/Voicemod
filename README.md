# Voicemod Aplication

Para ejecutar la aplicación será necesario desde la carpeta raíz del proyecto ejecutar `docker-compose up`. Este comando levantará la base de datos mongo.

Posteriormente se deberá crear en el directorio raíz un archivo llamado _.env_

       #.env
       DB_STRING=mongodb://root:example@127.0.0.1:27017/voicemod?authSource=admin
       DB_NAME=voicemod

Esto configurará las rutas hacia la BBDD.

Posteriormente ejectuaremos `npm install` para obtener las dependencias del proyecto.

Y por último ejecutaremos el _index.js_ con `node index.js`

esto levantará una api en http://localhost:3333 para aceptar peticiones.
