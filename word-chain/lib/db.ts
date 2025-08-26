// Placeholder for future PostgreSQL connection
// Swap implementations to use real database queries later

export type DbClient = unknown;

export async function getDbClient(): Promise<DbClient> {
  // In the future, initialize and return a real DB client (e.g., pg.Pool)
  return {} as DbClient;
}
