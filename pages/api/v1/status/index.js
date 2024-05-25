import database from "/infra/database";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const {
    rows: [{ server_version, max_connections, current_connections }],
  } = await database.query(
    `SELECT 
      current_setting('server_version') AS server_version,
      current_setting('max_connections')::int AS max_connections,
      (SELECT count(*)::int FROM pg_stat_activity WHERE state = 'active') AS current_connections;
    `
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        status: "",
        max_connections: max_connections,
        opened_connections: current_connections,
        version: server_version,
      },
    },
  });
}
