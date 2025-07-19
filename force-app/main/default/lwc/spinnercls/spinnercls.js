import { LightningElement,api } from 'lwc';

export default class Spinnercls extends LightningElement {
    
    @api isLoaded = false;

    // change isLoaded to the opposite of its current value
    toggle() {
        this.isLoaded = !this.isLoaded;
    }
}