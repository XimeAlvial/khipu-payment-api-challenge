# Khipu Payment API Challenge

__Desafío técnico:__ Integración de pagos con Khipu utilizando Node.js y el entorno de pruebas (sandbox) de DemoBank.

__Objetivo:__ Realizar una integración real utilizando la API de Khipu.

# ¿Qué logré implementar?

Mi implementación se centra en un flujo automatizado desde el servidor, asegurando la integridad de los datos mediante firmas digitales:

- __Creación de cobros:__ Generación de solicitudes vía API.
- __Gestión de pagos:__ Obtención de URLs de pago dinámicas.
- __Flujo de Usuario:__ Redirección, selección de banco y finalización del pago en Sandbox (DemoBank).
- __Verificación:__ Validación del éxito de la transacción (pago exitoso).
 
*Nota: Todo el proceso fue realizado mediante código, sin crear cobros manuales en el panel de Khipu.*

# Tecnologías

Para este desarrollo se utilizo:
 __Node.js:__ Entorno de ejecución.
 __Axios:__ Para el consumo de la API REST.
 __Crypto:__ Implementación de firma HMAC SHA256 para autenticación.
 __Dotenv:__ Gestión segura de variables de entorno.

# Credenciales

Las credenciales se almacenan mediante variables de entorno.

Archivo .env:
RECEIVER_ID=XXXXXX
SECRET_KEY=XXXXXXXXXXXXXXXX

*__Nota:__ El archivo .env no se encuentra incluido en este repositorio por motivos de seguridad.*

# Puesta en marcha

Para probar mi solución, sigue estos pasos:

__1. Clonar repositorio:__

Bash
git clone https://github.com/XimeAlvial/khipu-payment-api-challenge.git
cd khipu-payment-api-challenge

__2. Instalar dependencias:__

Bash
npm install

__3. Configura tus credenciales:__

Crea un archivo .env en la raíz con tus llaves:
RECEIVER_ID=TU_RECEIVER_ID
SECRET_KEY=TU_SECRET_KEY

__4. Ejecuta:__

Bash
node app.js

# Lógica del Proceso/Funcionamiento

Desarrollé el flujo asegurando que cada paso sea seguro y siga los estándares de la API:

1. Generación de un transaction_id único.
2. Construcción del string de firma.
3. Creación del hash HMAC-SHA256 (clave de seguridad para la autenticación).
4. Envío de petición POST a https://khipu.com/api/2.0/payments.
5. Recepción y manejo de la URL para completar el pago.

# Evidencia del proceso completo (Sandbox)

1. URL de pago generada desde consola: [Paso 1](screenshots/01-consola-url-pago.JPG)
2. Pantalla inicial de pago Khipu: [Paso 2](screenshots/02-khipu-pago.JPG)
3. Selección de DemoBank: [Paso 3](screenshots/03-demobank.JPG)
4. Ingreso a cuenta DemoBank: [Paso 4](screenshots/04-demobank-cuenta.JPG)
5. Autorización de la transferencia: [Paso 5](screenshots/05-demobank-autorizacion.JPG)
6. Transferencia completada: [Paso 6](screenshots/06-transferencia-completada.JPG)
7. Pago verificado exitosamente: [Paso 7](screenshots/07-pago-verificado.JPG)

# Resultado

La integración fue completada exitosamente utilizando:

- API de Khipu
- Entorno DemoBank
- Creación de cobros vía API
- Flujo de pago completo
- Verificación final del pago

# Conclusiones

Este desafío me permitió profundizar en la autenticación con firmas digitales y el manejo de APIs de pago. Logré completar el flujo completo de forma robusta.

# Autor
*Ximena Alvial*
*Desafío técnico Khipu 2026*

 

