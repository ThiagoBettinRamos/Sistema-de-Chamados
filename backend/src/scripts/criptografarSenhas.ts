import bcrypt from "bcrypt";
import pool from "../config/database";

(async () => {
  try {
    console.log("Iniciando criptografia das senhas...");

    const query = "SELECT id, senha FROM usuarios";
    const result = await pool.query(query);

    for (const row of result.rows) {
      if (!row.senha.startsWith("$2b$")) {
        const hashedPassword = await bcrypt.hash(row.senha, 10);

        await pool.query("UPDATE usuarios SET senha = $1 WHERE id = $2", [
          hashedPassword,
          row.id,
        ]);

        console.log(`Senha do usuário ID ${row.id} atualizada.`);
      }
    }

    console.log("Criptografia das senhas concluída.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criptografar senhas:", error);
    process.exit(1);
  }
})();
