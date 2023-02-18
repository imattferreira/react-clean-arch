import { AuthenticationParams } from '../../../domain/use-cases/authentication';
import type { HttpPostClient } from '../../protocols/http/http-post-client';

class RemoteAuthentication {
  constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth({ email, password }: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: {
        email,
        password
      }
    });
  }
}

export default RemoteAuthentication;
