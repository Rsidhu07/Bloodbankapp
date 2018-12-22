app.factory("myfactory", () => {

    const itemOperations = {
        items: {},
        add(itemObject, bloodGroupToReceiverBloodsMap) {
            var item = new Item(itemObject.bname, itemObject.bcount);
            if (!item.bname) {
                alert('Input blood group name to add number of bottles');
                return;
            }
            if (!item.bcount) {
                alert('Input number of bottles');
                return;
            }
            if (!bloodGroupToReceiverBloodsMap[item.bname]) {
                alert('Please enter a valid blood group');
                return;
            }
            item.color = 'grey';
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