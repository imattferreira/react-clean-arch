import { Authentication, AuthenticationParams } from '@/domain/use-cases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

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
