export interface ResponseStatusModel {
  success: boolean;
  message: string;
  data: any;
  erorr: Error;
}
