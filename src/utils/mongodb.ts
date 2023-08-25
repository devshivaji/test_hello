import { ObjectId, WithId } from "mongodb";
import { mongoClient } from "../configs/mongodb";
import { flatten } from "./array";

export abstract class MongoDBModel {
    public readonly _id?: ObjectId;

    clearNulls() {
        const keys = Object.keys(this);

        keys.forEach(key => {
            if (!this[key as keyof this]) {
                delete this[key as keyof this];
            }
        });

        return this;
    }
    
};

export const deleteDB = async (dbName: string) => {
    await mongoClient.db(dbName).dropDatabase();
};

export const populate = async <T>(docs: WithId<T>[], ref: string) => {
    const refs = flatten(docs.map(doc => doc[ref as keyof WithId<T>]))
    console.log(refs);

    // docs.forEach(doc => {
    //     const reference = doc[ref as keyof WithId<T>];

    //     if (Array.isArray(reference)) {
    //         const fullBodyAsync = reference.map(it => {
    //             return new Promise((resolve) => {
                    
    //             })
    //         });
    //     }
    // });
}
