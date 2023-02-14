import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
	timestamps: false
})
export class User extends Model {
	@Column({
		type: DataType.STRING,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataType.UUIDV4
	})
	id: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	username: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	email: string;

	@Column({
		type: DataType.BIGINT,
		allowNull: true
	})
	birthday: number;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string;

	@Column({
		type: DataType.BIGINT,
		allowNull: false,
		defaultValue: new Date().getTime()
	})
	created_at: bigint;
}