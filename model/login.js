'use strict';

module.exports.getAccount = function (source, key) {
    return new Promise((resolve, reject) => {
        source.get(key, (err, data) => {
            if(err){
                resolve(err);
                return;
            }
            if(!data){
                resolve(null);
                return;
            }
            let info = JSON.parse(data);
            resolve(info);
        })
    })
}