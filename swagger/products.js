/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - description
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: უნიკალური იდენტიფიკატორი
 *           example: 1
 *         name:
 *           type: string
 *           description: პროდუქტის სახელი
 *           example: Banana
 *         price:
 *           type: number
 *           format: float
 *           description: პროდუქტის ფასი
 *           example: 9.99
 *         description:
 *           type: string
 *           description: პროდუქტის აღწერა
 *           example: Fresh Ecuadorian banana
 *         stock:
 *           type: integer
 *           description: რამდენი ცალია მარაგში
 *           example: 150
 *         slug:
 *           type: string
 *           description: პროდუქტის URL-friendly სახელწოდება
 *           example: banana
 *         archive:
 *           type: boolean
 *           description: პროდუქტი არქივშია თუ არა
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: შექმნის თარიღი
 *           example: 2025-06-08T10:30:00.000Z
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "201":
 *         description: Product created successfully
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       "200":
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       "404":
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "200":
 *         description: Product updated successfully
 *       "404":
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Partially update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       "200":
 *         description: Product updated successfully
 *       "404":
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       "200":
 *         description: Product deleted successfully
 *       "404":
 *         description: Product not found
 */
