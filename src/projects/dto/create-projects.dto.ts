export class CreateProjectDto {
  readonly title: string;
  readonly description: string;
  readonly manager: string;
  readonly employees: Array<any>;
  readonly startDate:string;
  readonly endDate:string
}
