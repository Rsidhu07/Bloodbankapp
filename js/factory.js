app.factory("myfactory", () => {

    const itemOperations = {
        items: {},
        add(itemObject) {
            var item = new Item(itemObject.bname, itemObject.bcount);
            if (!item.bname) {
                alert('Input blood group name to add number of bottles')
                return
            }
            if (!item.bcount) {
                alert('Input number of bottles')
                return
            }
            item.color = 'grey'
            this.items[item.bname] = item;
            // this.items.push(itemObject); 
            return this.items;
        },
        deleteAll() {
            this.items = {}
            return this.items
        }
    };


    return itemOperations;

})