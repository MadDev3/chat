import { Model, Table, Column, DataType } from "sequelize-typescript";

interface MessageCreationAttrs {
    content: string;
    idFrom: number;
    idTo: number;
}

@Table({tableName: 'messages'})
export class Message extends Model<Message, MessageCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    content: string;
    @Column({type: DataType.INTEGER, allowNull: false})
    idFrom: number
    @Column({type: DataType.INTEGER, allowNull: false})
    idTo: number
}