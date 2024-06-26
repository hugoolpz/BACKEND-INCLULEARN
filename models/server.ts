import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";
import rutasUsuarios from "../routes/usuario";
import rutasAuth from "../routes/auth";
import rutasGrupos from "../routes/grupo";
import rutasCanales from "../routes/canal";
import rutasMensajes from "../routes/mensaje";
import rutasChats from "../routes/chatPrivado";
import rutasMarcas from "../routes/marcaTiempo";
import rutasStorage from "../routes/firebaseStorage";
import { UsuarioModel } from "./usuario";

class Servidor {
  private app: Application;
  private port: string;
  private http: http.Server;
  private io: socketIO.Server;
  private rutasApi = {
    auth: "/api/auth/",
    usuarios: "/api/usuarios/",
    grupos: "/api/grupos/",
    canales: "/api/canales/",
    mensajes: "/api/mensajes/",
    chatsPrivados: "/api/chatsPrivados/",
    marcasTiempo: "/api/marcasTiempo/",
    storage: "/api/storage/",
  };

  constructor() {
    this.app = express();
    //Usamos la variable de entorno PORT y si es null, ponemos 8080
    this.port = "3000";
    this.http = new http.Server(this.app);
    this.io = new socketIO.Server(this.http, {
      cors: {
        origin: "http://localhost:9000",
      },
    });
    //Nos intentamos conectar a la BD
    this.establecerConexionBD();
    //Activamos los middlewares
    this.middlewares();
    //Definimos rutas
    this.routes();
    //Configuramos el websocket
    this.configurarSocketIO();
  }

  establecerConexionBD() {
    mongoose
      .connect(process.env.MONGO_URL!)
      .then(() => {
        console.log("Éxito al conectar a Mongo");
      })
      .catch((error) => {
        console.log("Error al conectar a Mongo" + error);
      });

    //Quitar comentario en caso de necesitar modo debug
    mongoose.set("debug", true);
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Parseo del body
    this.app.use(express.json());
    //Codificar url
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configurarSocketIO(): void {
    this.io.on("connection", (socket: socketIO.Socket) => {
      socket.on("disconnect", () => {
        console.log("Usuario desconectado");
      });

      socket.on("notificar-llamada", async (canal, usuario) => {
        console.log("Notificando");
        try {
          this.io.emit("notificar-llamada", canal, usuario);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("cerrar-llamada", async () => {
        try {
          this.io.emit("cerrar-llamada");
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("irse-de-llamada", async (idTuya) => {
        try {
          this.io.emit("irse-de-llamada", idTuya);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on(
        "mensaje",
        async (idMensaje, idEmisor, contenido, marcaTiempo) => {
          try {
            const usuario = await UsuarioModel.findById(idEmisor);

            this.io.emit("mensaje", idMensaje, usuario, contenido, marcaTiempo);
          } catch (error) {
            console.log(error);
          }
        }
      );

      socket.on("usuario-escribiendo", async (usuario, idCanal) => {
        try {
          this.io.emit("usuario-escribiendo", usuario, idCanal);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("usuario-no-escribiendo", async (usuario, idCanal) => {
        try {
          this.io.emit("usuario-no-escribiendo", usuario, idCanal);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("mensaje-borrado", async (idMensaje) => {
        try {
          this.io.emit("mensaje-borrado", idMensaje);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("mensaje-editado", async (idMensaje, contenidoNuevo) => {
        try {
          this.io.emit("mensaje-editado", idMensaje, contenidoNuevo);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  routes() {
    this.app.use(this.rutasApi.auth, rutasAuth);
    this.app.use(this.rutasApi.usuarios, rutasUsuarios);
    this.app.use(this.rutasApi.grupos, rutasGrupos);
    this.app.use(this.rutasApi.canales, rutasCanales);
    this.app.use(this.rutasApi.mensajes, rutasMensajes);
    this.app.use(this.rutasApi.chatsPrivados, rutasChats);
    this.app.use(this.rutasApi.marcasTiempo, rutasMarcas);
    this.app.use(this.rutasApi.storage, rutasStorage);
  }

  listen() {
    this.http.listen(this.port, () => {
      console.log("El servidor activo en puerto " + this.port);
    });
  }
}

//Exportamos la clase
export default Servidor;
