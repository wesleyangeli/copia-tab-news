test("GET to /api/v1/status shoud return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const { max_connections, opened_connections, version } =
    responseBody.dependencies.database;
  expect(typeof max_connections).toBe("number");
  expect(typeof opened_connections).toBe("number");
  expect(typeof version).toBe("string");
});
