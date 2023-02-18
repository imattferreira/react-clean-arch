import { faker } from '@faker-js/faker';

import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import mockAuthentication from '@/domain/tests/mock-authentication';
import RemoteAuthentication from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
}

function makeSut(url = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy();
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
});
