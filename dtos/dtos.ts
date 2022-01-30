

export enum ReimbursementStatus {
    pending = 'pending', 
    denied = 'denied', 
    approved = 'approved' 
}
export interface ReimbursementItem {
    id:string,
    type:string,
    desc:string,
    amount:number,
    status:ReimbursementStatus
    //files (to be implemented later)
}
export interface User {
    username:string,
    password:string,
    id:string,
    isAuthenticated:boolean,
    isManager:boolean,
    reimbs: string[]
}
export interface AddRequest{
    user:User;
    reimb:ReimbursementItem;
}