import { db } from "@/drizzle";
// import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable(
	"users",
	{
		id: text("id").primaryKey(),
		username: varchar("username").unique(),
		email: varchar("email", {}).notNull().unique(),
		password: varchar("password"),
		firstname: varchar("firstname"),
		lastname: varchar("lastname"),
		role: roleEnum("role").notNull().default("user"),
		isDeleted: boolean("is_deleted").default(false),
		isVerified: boolean("is_verified").default(false),
		createdAt: timestamp("created_at")
			.$default(() => new Date())
			.notNull(),
		updatedAt: timestamp("updated_at", {})
			.$default(() => new Date())
			.notNull(),
	},
	(users) => ({
		usernameIndex: uniqueIndex("username_idx").on(users.username),
		emailIndex: uniqueIndex("email_idx").on(users.email),
	}),
);

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

export const sessionTable = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

// TODO: go for inference here?
export const insertUser = async (user: NewUser) => {
	return db.insert(userTable).values(user).returning();
};

export const emailSchema = z.string().email();
export const usernameSchema = z.string().min(3).max(64);
