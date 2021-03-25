# Rick and Morty Challenge - Frontend

Este repositorio contiene el frontend del [desafío Rick and Morty](https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217 "desafío Rick and Morty") de Chipax, desarrollado con Nuxt.js.
### Características

- Ruta **/char-counter**: Consume directamente la Rick and Morty API.
- Ruta **/episode-locations**: Consume un orquestador sobre API Gateway (en node.js) de los endpoints de Rick and Morty API necesarios.


## Comandos de compilación
Sobre la raíz del repositorio ejecutar los siguientes comandos:

```bash
# instalación de dependencias
$ npm install

# correr servidor con hot reload en localhost:3000
$ npm run dev

# compilar para producción e iniciar servidor
$ npm run build
$ npm run start

# generar proyecto estático
$ npm run generate
```

### Vista previa

En el siguiente link se disponibiliza una compilación de sitio estático para demostración:

http://rick-morty-front.s3-website-us-east-1.amazonaws.com/
