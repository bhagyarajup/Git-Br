({
    onChange: function (cmp, evt, helper) {
        alert(cmp.find('select').get('v.value') + ' pie is good.');
        alert(cmp.find('colorId').get('v.value') + ' pie is good.');
    },
    
   init :function (cmp, evt, helper) {
    /* var  colors= [
                    { id: 1, label: 'Red' },
                    { id: 2, label: 'Green'},
                    { id: 3, label: 'Blue' }
                ]; */
       var colors=[];
       
       for(let i=1;i<=7;i++){
           //var obj ="{ id: "+i+", label :" + i+ "}";
           var obj ={};
           obj.id=i;
           obj.label=i;
           colors.push(obj);
           
       }
       console.log("colors :"+colors);
       var colors1= [
                    { id: 1, label: 'Red' },
                    { id: 2, label: 'Green'},
                    { id: 3, label: 'Blue' }
                ];
       console.log("colors1 :"+colors1);
    cmp.set("v.options",colors);
}
})