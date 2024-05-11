export class Projects {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  isSavedInDB: boolean = false

  constructor (id: number, name: string, startDate: Date | null, endDate: Date | null){
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isSavedInDB = true;
  }
}
