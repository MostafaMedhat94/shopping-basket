import * as _mongoose from "mongoose";

class Mongoose {
    public mongoose = _mongoose;

    constructor() {
        this._initDb();
    }

    private _initDb() {
        // Use the built-in JS Promise implementaion
        this.mongoose.Promise = global.Promise;

        // Don't use the deprecated method "useFindAndModify"
        this.mongoose.set("useFindAndModify", false);

        _mongoose
            .connect(`${process.env.MONGODB_URI}`, {
                useCreateIndex: true,
                useNewUrlParser: true,
                reconnectTries: 30,
                poolSize: 10,
            })
            .then((db: any) => {
                console.log(
                    `Connected Successfully to "${db.connections[0].name}" DB.`,
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default Mongoose;
