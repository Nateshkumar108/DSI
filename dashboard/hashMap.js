/* Hash Function */

var hash = (string, max) => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
    }
    return hash % max;
};

/* Hash Table */

let HashTable = function () {

    let storage = [];
    const storageLimit = 300;

    this.print = function () {
        console.log(storage)                                            //check the storage values
    }

    /*For storing values in hash table*/
    this.add = function (key, value) {
        var index = hash(key, storageLimit);
        if (storage[index] === undefined) {                             //if nothing is in index then store value to key
            storage[index] = [
                [key, value]
            ];
        } else {
            var inserted = false;                                       //firstly set inserted value as false
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {                     //check if key exists
                    storage[index][i][1] = value;                       //set the value to the storage index
                    inserted = true;                                    //now set inserted as true
                }
            }
            if (inserted === false) {                                   //if key not exists push new item
                storage[index].push([key, value]);                          
            }
        }
    };

    /*For deleting values from hash table*/
    this.remove = function (key) {
        var index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        } else {
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    };

    /*For finding value from hash table*/
    this.lookup = function (key) {
        var index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        } else {
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
            }
        }
    };

};


console.log(hash('quincy', 10))

let ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin')
console.log(ht.lookup('tux'))
ht.print();