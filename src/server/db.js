import pg from "pg"

export const pool = new pg.Pool({
user:process.env.POSTGRESS_USER || "postgres",
password:process.env.POSTGRESS_PASSWORD || "root",
host:process.env.POSTGRESS_HOST || "localhost",
port:process.env.POSTGRESS_PORT || 5432,
database:process.env.POSTGRESS_DB || "shops",
})

