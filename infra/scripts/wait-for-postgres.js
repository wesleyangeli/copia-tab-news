const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdOut) {
    if (stdOut.search("accepting connections") === -1) {
      process.stdout.write(`:`);
      setTimeout(checkPostgres, 1000);
    } else {
      console.log("\n🟢 Postgres está pronto e aceitando conexões \n");
    }
  }
}

console.log("\n \n🔴 Aguardando Postgres aceitar coinexões ");
checkPostgres();
