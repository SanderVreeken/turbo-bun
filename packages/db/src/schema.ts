import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const todo = pgTable('todo', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const insertTodoSchema = createInsertSchema(todo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectTodoSchema = createSelectSchema(todo)
