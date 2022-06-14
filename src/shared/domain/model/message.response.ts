export class MessageResponse {

  statusCode: number; 
  message: string;    
  response: any;      

  constructor(statusCode?: number, message?: string, response?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.response = response;
  }
}
