export class Colaborators {
  id: number;
  email: string;
  name: string;
  street: string;
  postalCode: string;

  constructor ( id: number, email: string, name: string, street: string, postalCode: string){
    this.id = id;
    this.email = email;
    this.name = name;
    this.street = street;
    this.postalCode = postalCode;
  }
}
