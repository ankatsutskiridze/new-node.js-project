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
