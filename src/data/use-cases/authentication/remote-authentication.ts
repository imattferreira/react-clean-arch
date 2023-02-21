import { Authentication, AuthenticationParams } from '@/domain/use-cases/authentication';
import type { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials-error';
import UnexpectedError from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/models/account-model';

class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
  ) {}

  async auth({ email, password }: AuthenticationParams): Promise<AccountModel> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: {
        email,
        password
      }
    });

    switch (statusCode) {
    case HttpStatusCode.ok:
      return body;
    case HttpStatusCode.unauthorized:
      throw new InvalidCredentialsError();
    default:
      throw new UnexpectedError();
    }
  }
}

export default RemoteAuthentication;
