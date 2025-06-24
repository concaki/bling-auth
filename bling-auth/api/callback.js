export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("Código de autorização não encontrado.");
  }

  const clientId = "SEU_CLIENT_ID";
  const clientSecret = "SEU_CLIENT_SECRET";
  const redirectUri = "https://SEU_PROJETO.vercel.app/api/callback";

  const tokenResponse = await fetch("https://api.bling.com.br/Api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    })
  });

  const data = await tokenResponse.json();

  if (data.access_token) {
    return res.status(200).json({
      mensagem: "Autorizado com sucesso!",
      tokens: data
    });
  } else {
    return res.status(500).json({ erro: "Erro ao trocar token", detalhes: data });
  }
}
