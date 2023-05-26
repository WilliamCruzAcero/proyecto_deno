import {Schema, model} from 'npm:mongoose';

interface IUser {
    type?: string;
    avatar?: string;
    name?: string;
    lastname?: string;
    age?: number;
    phone?: number;
    email?: string;
    password?: string;
    address?: string;
    city?: string;
    country?: string;
    productos?: [{
        nombre?: string;
        precio?: number;
        imagen?: string;
        cantidad?: number;
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
    password: {type: String, required: true, default: ''},
    address:{type: String, required: true, default: ''},
    city: {type: String, required: true, default: ''},
    country: {type: String, required: true, default: ''},
    productos: [{
        nombre: {type: String, required: true, default: ''},
        precio: {type: Number, required: true, default: 0},
        imagen: {type: String, required: true, default: ''},
        cantidad: {type: Number, required: true, default: 0},
        
    }]
});

export const userModel = model<IUser>('User', userSchema);