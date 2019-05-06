const uuidv1 = require('uuid/v1');
var arrayUuid = uuidv1().split('-');

// auxMilitante.id = uuidv1();

console.log(arrayUuid[0]+arrayUuid[1]+arrayUuid[2]+arrayUuid[3]+arrayUuid[4])