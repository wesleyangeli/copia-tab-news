import database from "/infra/database.js";

export default async function status(request, response) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows);
  response.status(200).json({ chave: "são a cima da média" });
}
