export enum HttpStatusCode {
  // 2xx
  ok = 200,
  created = 201,
  noContent = 204,
  // 4xx
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  // 5xx
  serverError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: unknown;
}
