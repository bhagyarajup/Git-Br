import { LightningElement,track } from 'lwc';

export default class MeetingRooms extends LightningElement {
  @track meetingRoomsInfo = [{roomName:'A-001',roomSize:20},
  {roomName:'A-002',roomSize:20},
  {roomName:'A-003',roomSize:30},
  {roomName:'B-001',roomSize:40},
  {roomName:'B-002',roomSize:50},
  {roomName:'B-003',roomSize:10},
  {roomName:'C-001',roomSize:5},
  {roomName:'C-002',roomSize:35},
  {roomName:'C-003',roomSize:20}

];
@track roomInfoBoolean ;
showRoominfo(event){
  if(event.target.checked){
  this.roomInfoBoolean=true;
  }
  else{
    this.roomInfoBoolean=false;
  }
}
}