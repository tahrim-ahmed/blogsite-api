export class PayloadDto {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(
    public count: number = 0,
    // eslint-disable-next-line @typescript-eslint/ban-types
    public data: Object = [],
  ) {}
}
