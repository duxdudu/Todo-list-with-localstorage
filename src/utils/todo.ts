export default interface TodoType{
    id:number,
    text:string,
    completed:boolean,
    dueDate: Date | null;
}