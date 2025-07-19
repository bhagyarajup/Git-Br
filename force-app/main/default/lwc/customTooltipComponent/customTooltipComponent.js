import { LightningElement } from 'lwc';

export default class CustomTooltipComponent extends LightningElement {
    showTooltipFlag = false;

    showTooltip() {
        this.showTooltipFlag = true;
    }

    hideTooltip() {
        this.showTooltipFlag = false;
    }
}