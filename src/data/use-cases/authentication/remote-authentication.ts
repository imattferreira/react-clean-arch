import { AuthenticationParams } from '@/domain/use-cases/authentication';
import type { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials-error';

class RemoteAuthentication {
  constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth({ email, password }: AuthenticationParams): Promise<void> {
    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: {
        email,
        password
      }
    });

    switch (statusCode) {
    case HttpStatusCode.unauthorized:
      throw new InvalidCredentialsError();
    default:
      return Promise.resolve();
    }
  }
}

export default RemoteAuthentication;
