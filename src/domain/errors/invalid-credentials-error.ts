class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas');
    this.name = 'INvalidCredentialsError';
  }
}

export default InvalidCredentialsError;
