import { createId } from '@paralleldrive/cuid2'
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { user } from './auth-schema';

export const statusEnum = pgEnum('status', ['to-do', 'in-progress', 'review', 'done']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

export const task = pgTable('task', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  status: statusEnum().notNull(),
  priority: priorityEnum().notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export type Task = typeof task.$inferSelect

export const insertTaskSchema = createInsertSchema(task).omit({
  id: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});

export const selectTaskSchema = createSelectSchema(task)
export const patchTasksSchema = insertTaskSchema.partial();
