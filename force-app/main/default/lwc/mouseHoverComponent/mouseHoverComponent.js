import { LightningElement } from 'lwc';

export default class MouseHoverComponent extends LightningElement {
    hoverMessage = 'No hover detected';

    handleMouseOver() {
        this.hoverMessage = 'Mouse is hovering!';
    }

    handleMouseOut() {
        this.hoverMessage = 'Mouse is not hovering anymore!';
    }
}