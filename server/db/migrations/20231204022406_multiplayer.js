export async function up(knex) {
  return knex.schema.createTable('multiplayer', (table) => {
    table.increments('id').primary()
    table.string('prompts')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('multiplayer')
}
