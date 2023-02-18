export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  unauthorized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: unknown;
}
