# chat backend

Un backend en desarrollo para un chat en tiempo real con usuarios.

que ofrecerá?

* [X] Creacion de usuarios
* [X] Inicio de sesion
* [ ] Sistema de amigos
* [ ] Bloquear chats

## Estado de la aplicación

De momento la aplicación se encuentra en un punto de desarrollo muy temprano, por lo que no es útil.

### Cosas hechas:
- Creación de usuarios. Parametros:
    - Nombre: string (Obligatorio) -> nombre de usuario. De momento no es unico
    - correo: string (Obligatorio) -> correo unico del usuario
    - password: string (Obligatorio) -> contraseña del usuario. Requisitos: 
      - Minimo 6 caracteres
      - Minimo 1 Numero y 1 mayúscula
    - Imagen -> url para cargar la imagen
- Iniciar sesion
    - Necesario: 
    - Correo
    - Contraseña
    - en caso exitoso devuelve:
      - status 200
      - msg: "login ok"
      - token jwt
    - objeto usuario para guardar en el frontend
    - en caso de fallo devuelve:
      - status 400
      - msg: "Usuario / Password no son correctos"

### Cosas por hacer:
- socket para enviar y recibir mensajes
- rutas protegidas
- frontend
- DM
- Grupos
- Request de amigos
- Aceptar request de amigos
- Bloquear gente (sinceramente esto no se como estructurarlo)
  
## a tener en cuenta

Esta es mi primera aplicacion 100% original por asi decirlo asi que este proyecto es mas para aprender conceptos y igual hay alguna cosa que no este del todo bien y se pueda mejorar.