import {Schema, model} from 'npm:mongoose';

export interface IUser {
    type: string;
    avatar: string;
    name: string;
    lastname: string;
    age: number;
    phone: number;
    email: string;
    password: string;
    address: string;
    city: string;
    country: string;
    products: [{
        name: string;
        price: number;
        image: string;
        amount: number;
    }]
    shoppingcart: [{
        name: string;
        price: number;
        amount: number;
    }]
}

export const userSchema = new Schema<IUser>({
    type: {type: String, required: true, default: ''},
    avatar:  {type: String, required: false, default: ''},
    name: {type: String, required: true, default: ''},
    lastname: {type: String, required: true, default: ''},
    age: {type: Number, required: true, default: 0},
    phone: {type: Number, required: true, default: 0},
    email: {type: String, required: true, default: ''},
    password: {type: String, required: true,},
    address:{type: String, required: true, default: ''},
    city: {type: String, required: true, default: ''},
    country: {type: String, required: true, default: ''},
    products: [{
        name: {type: String, required: true,},
        price: {type: Number, required: true, default: 0},
        image: {type: String, required: true, default: ''},
        amount: {type: Number, required: true, default: 0},
        }],
    shoppingcart: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
        amount: {type: Number, required: true},
        }]

});

export const userModel = model<IUser>('User', userSchema);