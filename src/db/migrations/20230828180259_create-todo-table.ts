import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('todos', function(table: any) {
        table.increments('id');
        table.string('title');
        table.integer('order');
        table.boolean('completed').defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('todos');
}

