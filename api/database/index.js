import {Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false
});


export const PhoneBook = sequelize.define('phone_book', {
    contact_id: {type: DataTypes.INTEGER, primaryKey: true,},
    phone_number: {type: DataTypes.CHAR},
    name: {type: DataTypes.CHAR},
    company: {type: DataTypes.CHAR},
    company_unit: {type: DataTypes.CHAR},
    role: {type: DataTypes.CHAR},

}, { schema: 'ts1', timestamps: false, tableName: 'phone_book'});


