export enum MessageEnum {
  CREDENTIALS_OK = 'Autenticación Correcta.!',
  CREDENTIALS_INVALID = 'Las credenciales son incorrectas!',
  ACCESS_INVALID = 'El acceso es inválido!',
  LOGIN_NOT_AUTORIZED = 'No autorizado!!!',  
  TWO_FACTOR_AUTHENTICATION = 'Es necesario el código de autenticación de 2 factores.',
  TWO_FACTOR_AUTHENTICATION_ERROR = 'Código de autenticación de 2 factores es incorrecto!.',
  
  ENTITY_SELECT = 'Datos devueltos correctamente.',
  ENTITY_ERROR_CREATE = 'Los datos no pudieron ser almacenados correctamente.',
  ENTITY_SELECT_EMPTY = 'No se encontraron registros.',
  ENTITY_PROCESS = 'Datos procesados correctamente.',

  USER_CREATED = 'Datos del Usuario fueron creados correctamente.',
  USER_UPDATE = 'Datos del Usuario fueron modificados correctamente.',  
  USER_DELETE = 'Datos del Usuario fueron eliminados correctamente.',    
  USER_EXIST = 'Datos de Usuario ya Existen!',
  USER_NOT_EXIST = 'Datos de Usuario no existen!',
  USER_VALIDATED = 'Datos del Usuario fueron validados correctamente.',
}
