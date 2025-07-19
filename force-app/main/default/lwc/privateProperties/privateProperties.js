import { LightningElement } from 'lwc';

export default class PrivateProperties extends LightningElement {
    privatepropvar="private property check";
    changeprivateprop(event){
        this.privatepropvar="button click ";

    }

}