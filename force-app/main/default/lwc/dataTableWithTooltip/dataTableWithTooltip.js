import { LightningElement } from 'lwc';

export default class DataTableWithTooltip extends LightningElement {
    data = [
        { id: 1, name: 'John Doe', age: 28, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles' },
        { id: 3, name: 'Sam Green', age: 45, city: 'Chicago' }
    ];

    columns = [
        { label: 'Name', fieldName: 'name', type: 'text' },
        { label: 'Age', fieldName: 'age', type: 'number' },
        { label: 'City', fieldName: 'city', type: 'text' }
    ];

    showTooltipFlag = false;
    tooltipContent = '';
    tooltipStyle = '';

    handleMouseOver(event) {
        const cellValue = event.target.closest('lightning-primitive-cell-factory').textContent.trim();
        this.tooltipContent = `Hovered data: ${cellValue}`;

        this.showTooltipFlag = true;

        const rect = event.target.getBoundingClientRect();
        const top = rect.top + window.scrollY + rect.height;
        const left = rect.left + window.scrollX;

        // Position tooltip
        this.tooltipStyle = `position: absolute; top: ${top}px; left: ${left}px;`;
    }

    handleMouseOut() {
        this.showTooltipFlag = false;
    }
}