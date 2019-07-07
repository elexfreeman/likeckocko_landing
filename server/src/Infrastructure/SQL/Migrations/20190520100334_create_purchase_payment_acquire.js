
exports.up = async function(knex, Promise) {

    let ifPurchasePaymentAcquire =  await knex.schema.hasTable('purchase_payment_acquire');
    if(ifPurchasePaymentAcquire){
        await knex.schema.dropTable('purchase_payment_acquire');
    }

    await knex.schema.createTable('purchase_payment_acquire', function (table) {
        table.increments('id');

        table.string('txn_id', 25).unique('txn_id')
            .comment('ID платежа в системе эквайринга');

        table.integer('invoice_id').index('invoice_id')
            .unsigned()
            .notNullable()
            .comment('ID счета пользователя по закупке');

        table.integer('purchase_id').index('purchase_id')
            .unsigned()
            .notNullable()
            .comment('ID закупки');

        table.integer('user_id').index('user_id')
            .unsigned()
            .notNullable()
            .comment('ID пользователя');

        table.integer('purchase_payment_form_id').unique('purchase_payment_form_id')
            .unsigned()
            .defaultTo(0)
            .comment('ID платежа');

        table.decimal('sum').index('sum')
            .defaultTo(0)
            .comment('Сумма платежа');

        table.enu('type', ['check', 'pay']).index('type')
            .notNullable()
            .defaultTo('check')
            .comment('Тип операции эквайринга');

        table.dateTime('created_at', null).index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');


        // table.index(['txn_id','purchase_id','user_id', 'type_operation']);
        table.comment('Таблица для учета транзакций с эквайринга')
        table.collate('utf8_general_ci');
    });

    return knex.schema;
};

exports.down = async function(knex, Promise) {
    let ifPurchasePaymentAcquire =  await knex.schema.hasTable('purchase_payment_acquire');
    if(ifPurchasePaymentAcquire){
        await knex.schema.dropTable('purchase_payment_acquire');
    }

    return knex.schema;
};
