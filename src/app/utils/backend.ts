export class Backend{
  private static get baseUrl(): string {
    return 'https://controladoria-backend.herokuapp.com/'
  }

  public static get pessoas(): string {
    return `${this.baseUrl}pessoas`
  }

  public static get clienteFisico(): string  {
    return `${this.baseUrl}clientes-fisicos`
  }
}
