export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("Código de autorização não encontrado.");
  }

  const clientId = "008516ba46c329c4d4c51fff49b76067f231f9ae";
  const clientSecret = "25ea34245a5af506a857d9f110164d43d422c38bcad2c4c6a18121042b56"; // ⚠️ Insira sua chave secreta real aqui
  const redirectUri = "https://bling-auth.vercel.app/api/callback";

  const response = await fetch("https://api.bling.com.br/Api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri
    })
  });

  const data = await response.json();

  if (data.access_token) {
    res.status(200).json({
      message: "Autorizado com sucesso!",
      tokens: data
    });
  } else {
    res.status(500).json({
      message: "Erro ao trocar o código por token",
      erro: data
    });
  }
}
