const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/rota', (req, res) => {
    res.send('Minha primeira rota!');
});

app.get('/novarota', (req, res) => {
    res.send('Nova rota criada');
});
app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    if (!cepRegex.test(cep)) {
        return res.status(400).send({ error: 'CEP inválido' });
    }
    try{
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    }catch (error){
        console.error('Erro ao fazer requisição: ', error);
        res.status(500).send({ error: 'Erro ao consultar CEP' });

    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);    
});