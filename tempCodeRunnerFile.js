carsDb.getAutoincrementId = function (cb) {
    //     this.update(
    //         { id: "__autoid__" },
    //         { $inc: { seq: 1 } },
    //         { upsert: true, returnUpdatedDocs: true },
    //         function (err, affected, autoid) {
    //             cb && cb(err, autoid.seq);
    //         }
    //     );
    //     return this;
    // };
    // newCar = {  
    //             id: carsDb.getAutoincrementId,
    //             name: req.body.name,
    //             mileage: req.body.mileage,
    //       }
    // carsDb.insert(newCar),function (err, cars){
    //     console.log("insertion success")
    // }