export abstract class ApiError extends Error implements IApiError {
  statusCode: number;
  name: string;
  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export interface IApiError {
  message: string;
  statusCode: number;
  name: string;
}
