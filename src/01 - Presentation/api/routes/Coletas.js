module.exports = app => {
    const controller = app.controllers.Coletas;

    /**
     * @swagger
     * components:
     *  schemas:
     *   Coletas:
     *    type: object
     *    
     */

    /**
     * @swagger
     * tags:
     *  - name: Coletas
     *    description: The collector managing API
     */

    /**
     * @swagger
     * /api/v2/Coletas:
     *   get:
     *     tags:
     *       - Coletas
     *     summary: Get de coleta
     *     responses:
     *       200:
     *         description: Sucesso no get da coleta
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas')
        .get(controller.listaColetas);

    /**
     * @swagger
     * /api/v2/Coletas:
     *   post:
     *     tags:
     *      - Coletas
     *     summary: post de coletas
     *     parameters:
     *       - name: Id
     *         description: Id Coleta
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Nome
     *         description: Nome Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Tipo
     *         description: Tipo de Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Peso
     *         description: Peso da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Status
     *         description: Status da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: MotoristaId
     *         description: Id de Motorista
     *         in: path ???
     *         required: true
     *         type: string 
     * 
     *       - name: ClienteId
     *         description: Id de Cliente
     *         in: path ???
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas')
        .post(controller.criarColeta);

    /**
     * @swagger
     * /api/v2/Coletas/disponivel:
     *   get:
     *     tags:
     *       - Coletas
     *     summary: Get de coletas disponíveis
     *     responses:
     *       200:
     *         description: Sucesso no get das coletas disponíveis
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas/disponivel')
        .get(controller.listaColetasDisponiveis);

    /**
     * @swagger
     * /api/v2/Coletas/:coletaId:
     *   get:
     *     tags:
     *       - Coletas
     *     summary: Descrição de coleta
     *     parameters:
     *       - name: coletaId
     *         description: Id de Descrição da Coleta
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
    app.route('/api/v2/Coletas/:coletaId')
        .get(controller.descricaoColeta);

    /**
     * @swagger
     * /api/v2/Coletas/:coletaId:
     *   put:
     *     tags:
     *      - Coletas
     *     summary: put de coletas
     *     parameters:
     *       - name: Id
     *         description: Id Coleta
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Nome
     *         description: Nome Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Tipo
     *         description: Tipo de Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Peso
     *         description: Peso da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Status
     *         description: Status da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: MotoristaId
     *         description: Id de Motorista
     *         in: path ???
     *         required: true
     *         type: string 
     * 
     *       - name: ClienteId
     *         description: Id de Cliente
     *         in: path ???
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas/:coletaId')
        .put(controller.alterarColeta);

    /**
     * @swagger
     * /api/v2/Coletas/:coletaId:
     *   delete:
     *     tags:
     *       - Coletas
     *     summary: Delete de coleta
     *     parameters:
     *       - name: Id
     *         description: Id da Coleta para deleção
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
    app.route('/api/v2/Coletas/:coletaId')
        .delete(controller.removeColeta);

    /**
     * @swagger
     * /api/v2/Coletas/:coletaId/Confirmacao:
     *   put:
     *     tags:
     *      - Coletas
     *     summary: put de confirmar coletas
     *     parameters:
     *       - name: Id
     *         description: Id Coleta
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Nome
     *         description: Nome Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Tipo
     *         description: Tipo de Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Peso
     *         description: Peso da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Status
     *         description: Status da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: MotoristaId
     *         description: Id de Motorista
     *         in: path ???
     *         required: true
     *         type: string 
     * 
     *       - name: ClienteId
     *         description: Id de Cliente
     *         in: path ???
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas/:coletaId/Confirmacao')
        .put(controller.confirmarColeta);

    /**
     * @swagger
     * /api/v2/Coletas/:coletaId/Motorista:
     *   put:
     *     tags:
     *      - Coletas
     *     summary: put de coletas motorista
     *     parameters:
     *       - name: Id
     *         description: Id Coleta
     *         in: path ???
     *         required: true
     *         type: int
     * 
     *       - name: Nome
     *         description: Nome Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Tipo
     *         description: Tipo de Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Peso
     *         description: Peso da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: Status
     *         description: Status da Coleta
     *         in: path ???
     *         required: true
     *         type: string
     * 
     *       - name: MotoristaId
     *         description: Id de Motorista
     *         in: path ???
     *         required: true
     *         type: string 
     * 
     *       - name: ClienteId
     *         description: Id de Cliente
     *         in: path ???
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: The client was successfully deleted
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Some server error
     */
    app.route('/api/v2/Coletas/:coletaId/Motorista')
        .put(controller.aceitarColeta);
}