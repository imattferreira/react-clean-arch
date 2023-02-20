import { faker } from '@faker-js/faker';

import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import mockAuthentication from '@/domain/tests/mock-authentication';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

import RemoteAuthentication from './remote-authentication';
import UnexpectedError from '@/domain/errors/unexpected-error';
import { AuthenticationParams } from '@/domain/use-cases/authentication';
import { AccountModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
}

function makeSut(url = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    const body = mockAuthentication();

    await sut.auth(body);

    expect(httpPostClientSpy.body).toEqual(body);
  });

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
