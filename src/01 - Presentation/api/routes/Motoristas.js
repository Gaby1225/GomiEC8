module.exports = app => {
    const controller = app.controllers.Motoristas;

    /**
     * @swagger
     * components:
     *  schemas:
     *   Motoristas:
     *    type: object
     *    
     */

    /**
     * @swagger
     * tags:
     *  - name: Motoristas
     *    description: The driver managing API
     */

    /**
     * @swagger
     * /api/v2/Motoristas:
     *   post:
     *     tags:
     *      - Motoristas
     *     summary: Create a new driver
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
     *       - name: Tipo
     *         description: Tipo de Veículo
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CNH
     *         description: Número da CNH
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Expiração
     *         description: Expiração CNH
     *         in: path ???
     *         required: false
     *         type: string
     * 
     *       - name: Categoria
     *         description: Categoria carteira de motorista
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Carga
     *         description: Peso máximo de carga
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
     * /api/v2/Motoristas/:motoristaId:
     *   put:
     *     tags:
     *      - Motoristas
     *     summary: Alter a new driver
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
     *       - name: Tipo
     *         description: Tipo de Veículo
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: CNH
     *         description: Número da CNH
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Expiração
     *         description: Expiração CNH
     *         in: path ???
     *         required: false
     *         type: string
     * 
     *       - name: Categoria
     *         description: Categoria carteira de motorista
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Carga
     *         description: Peso máximo de carga
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
    app.route('/api/v2/Motoristas/:motoristaId')
        .put(controller.atualizarMotorista);

    /**
     * @swagger
     * /api/v2/Motoristas/:motoristaId:
     *   delete:
     *     tags:
     *       - Motoristas
     *     summary: Delete de motorista
     *     parameters:
     *       - name: Id
     *         description: Id do motorista para deleção
     *         in: path ???
     *         required: true
     *         type: int
     *     responses:
     *       200:
     *         description: The driver was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Motoristas/:motoristaId')
        .delete(controller.removerMotorista);

    app.route('/api/v2/Motoristas/:motoristaId')
        .get(controller.consultarMotorista);
}