module.exports = app => {
    const controller = app.controllers.Clientes;

    /**
     * @swagger
     * components:
     *  schemas:
     *   Clientes:
     *    type: object
     *    
     */

    /**
     * @swagger
     * tags:
     *  - name: Clientes
     *    description: The clients managing API
     */

    /**
     * @swagger
     * /api/v2/Clientes:
     *   post:
     *     tags:
     *      - Clientes
     *     summary: Create a new client
     *     parameters:
     *       - name: id
     *         description: desabilitar escrita
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Email
     *         description: Email@email.com
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: senha
     *         description: Password1
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: senhaConfirmacao
     *         description: senha Confirmacao
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Nome
     *         description: nome e sobrenome
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: DataDeNascimento
     *         description: 00/00/0000
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CPF
     *         description: 000.000.000-00
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Telefone
     *         description: (00) 0 0000-0000
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Rua
     *         description: Rua/Avenida
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Numero
     *         description: Número da casa/apartamento
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Complemento
     *         description: Complemento
     *         in: path ???
     *         required: false
     *         type: string
     * 
     *       - name: Bairro
     *         description: Bairro
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Cidade
     *         description: Cidade
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CEP
     *         description: 00.000-010
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *     responses:
     *       200:
     *            description: The client was successfully created
     *       400:
     *         description: Bad Request
     *       500:
     *            description: Some server error
     */

    /**
     * @swagger
     * /api/v2/Clientes/:clienteId:
     *   delete:
     *     tags:
     *       - Clientes
     *     summary: Remove a client
     *     parameters:
     *       - name: Id
     *         description: Id Cliente
     *         in: path ???
     *         required: true
     *         type: int
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Clientes/:clienteId')
        .delete(controller.removerCliente);

    /**
     * @swagger
     * /api/v2/Clientes/:clienteId:
     *   put:
     *     tags:
     *       - Clientes
     *     summary: Update a client
     *     parameters:
     *       - name: id
     *         description: desabilitar escrita
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Email
     *         description: Email@email.com
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: senha
     *         description: Password1
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: senhaConfirmacao
     *         description: senha Confirmacao
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Nome
     *         description: nome e sobrenome
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: DataDeNascimento
     *         description: 00/00/0000
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CPF
     *         description: 000.000.000-00
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Telefone
     *         description: (00) 0 0000-0000
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Rua
     *         description: Rua/Avenida
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Numero
     *         description: Número da casa/apartamento
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Complemento
     *         description: Complemento
     *         in: path ???
     *         required: false
     *         type: string
     * 
     *       - name: Bairro
     *         description: Bairro
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Cidade
     *         description: Cidade
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CEP
     *         description: 00.000-010
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Clientes/:clienteId')
        .put(controller.atualizarCliente);

    app.route('/api/v2/Clientes/:clienteId')
        .get(controller.consultarCliente);

}