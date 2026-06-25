require('dotenv').config(); // Carga las variables del archivo .env (RECEIVER_ID y SECRET_KEY)
const axios = require('axios'); // Permite realizar llamadas HTTP hacia Khipu
const crypto = require('crypto'); // Permite generar firmas HMAC SHA256

/**

* Función que codifica caracteres especiales usando Percent Encoding.
* Khipu exige este formato para construir la firma.
  */
function percentEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

/**

* Construye la "cadena base" (baseString) o el texto exacto que Khipu utiliza para validar la firma.
*
* Formato:
* POST&url_codificada&param1=valor1&param2=valor2...
  */
function buildBaseString(method, url, params) {
  const sortedKeys = Object.keys(params).sort(); // Ordena parámetros alfabéticamente para que coincidan siempre

// Comienza la cadena con el método (POST) y la URL codificada
  const parts = [
    method.toUpperCase(),
    percentEncode(url)
  ];

// Añade cada parámetro ordenado y codificado a la cadena
  for (const key of sortedKeys) {
    parts.push(`${percentEncode(key)}=${percentEncode(params[key])}`);
  }

// Une todo con "&"
  return parts.join('&');
}

/**

* Crea un cobro en Khipu utilizando la API clásica 2.0.
  */
async function enviarPago() {
// Credenciales obtenidas desde variables de entorno
  const receiverId = process.env.RECEIVER_ID;
  const secretKey = process.env.SECRET_KEY;

// Endpoint oficial de creación de cobros
  const url = 'https://khipu.com/api/2.0/payments';
  const method = 'POST';

// Datos del cobro
  const params = {
    amount: 1000,
    currency: 'CLP',
    return_url: 'https://google.com',
    subject: 'Compra de prueba',
    transaction_id: 'tx_' + Date.now()
  };

// Construcción del string que será firmado
  const baseString = buildBaseString(method, url, params);
// Generación de firma HMAC SHA256 usando llave secreta
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(baseString)
    .digest('hex');

// Conversión del body a formato x-www-form-urlencoded
  const formBody = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();

  try {
// Envío de la solicitud a Khipu incluyendo la firma en el encabezado
    const response = await axios.post(url, formBody, {
      headers: {
        Authorization: `${receiverId}:${signature}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

// Muestra la URL para que el usuario pueda pagar
    console.log('URL DE PAGO:', response.data.payment_url);
  } catch (error) {
    console.error('ERROR:', error.response ? error.response.data : error.message); // Si algo falla, muestra el detalle del error
  }
}

// Ejecuta la función/proceso
enviarPago();