import { LightningElement } from 'lwc';

export default class DataTableMouseHoverTest extends LightningElement {
    // Tooltip properties
    showTooltip = false;
    tooltipText = '';
    tooltipStyle = '';

    // Sample data
    data = [
        { id: '1', name: 'Light 1', power: '100W', status: 'ON', description: 'This is a very long description for Light 1. It will be shown fully when hovered over.' },
        { id: '2', name: 'Light 2', power: '75W', status: 'OFF', description: 'Another long description for Light 2. It will also be shown on hover.' }
    ];

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Power', fieldName: 'power' },
        { label: 'Status', fieldName: 'status' },
        { label: 'Description', fieldName: 'description', wrapText: false }
    ];

    handleMouseOver(event) {
        const cell = event.target.closest('.slds-cell-edit'); // Detect the closest cell
        if (cell) {
            const rowKey = cell.getAttribute('data-row-key-value'); // Get the row's key value
            const columnField = cell.getAttribute('data-field-name'); // Get the column field name

            // Find the corresponding data row
            const rowData = this.data.find(row => row.id === rowKey);

            // If row and column exist, get the text to show
            if (rowData && rowData[columnField]) {
                this.tooltipText = rowData[columnField]; // Set the full text as tooltip content
                this.showTooltip = true;

                // Set tooltip position near the mouse cursor
                this.tooltipStyle = `position: absolute; top: ${event.clientY + 10}px; left: ${event.clientX + 10}px;`;
            }
        }
    }

    handleMouseOut() {
        this.showTooltip = false; // Hide the tooltip when the mouse leaves the cell
    }
}