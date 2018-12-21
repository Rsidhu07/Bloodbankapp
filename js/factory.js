app.factory("myfactory",()=>{

    const itemOperations = {
        items:[],
        add(itemObject){
            var item = new Item(itemObject.bname, itemObject.bcount);
            this.items.push(item);
          // this.items.push(itemObject); 
           return this.items;
        }

    };


        return itemOperations;

})