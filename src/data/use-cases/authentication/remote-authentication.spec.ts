import { faker } from '@faker-js/faker';

import { HttpPostClientSpy } from '@/data/test';
import { mockAccountModel, mockAuthentication } from '@/domain/tests';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';
import { AuthenticationParams } from '@/domain/use-cases';
import { AccountModel } from '@/domain/models';

import RemoteAuthentication from './remote-authentication';

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

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const result = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result,
    };

    const account = await sut.auth(mockAuthentication());

    expect(account).toEqual(result);
  });
});
