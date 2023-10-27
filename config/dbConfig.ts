import * as path from 'path'

export const typeOrmConfig = {
    type:       process.env.TYPEORM_CONNECTION || 'mysql',
    host:       process.env.DISPATCH_SERVICE_DB_HOST || '127.0.0.1',
    port:       process.env.DISPATCH_SERVICE_DB_PORT || '32768',
    username:   process.env.DISPATCH_SERVICE_DB_USERNAME || 'wallets_user',
    password:   process.env.DISPATCH_SERVICE_DB_PASSWORD || 'wallets_pass',
    database:   process.env.DISPATCH_SERVICE_DB || 'WALLETS',
    synchronize:    Boolean(process.env.TYPEORM_SYNCHRONIZE) || true,
    cli: { migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR },
    entities: [`${__dirname}/../**/*.entity.{ts,js}`]
}