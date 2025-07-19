import { LightningElement,api } from 'lwc';

export default class GetSetTest extends LightningElement {
 @api firstName;
 @api lastName;
 fname;
 lname;
 get fullName(){
    return `${this.firstName} ${this.lastName}`;
 }
 set fullName(name){
    const parts = name.split(' ');
    this.fname=parts[0];
    this.lname=parts[1];
 }

}