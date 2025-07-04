const db = require('../db');

class PlantController {

    async getAll(req, res) {
        try {
            const { category, search } = req.query; // Отримуємо параметри category та search
            let sql = 'SELECT * FROM plants';
            const params = [];

            if (category && category !== '') { // Якщо category присутня та не порожня
                sql += ' WHERE category = ?';
                params.push(category);
            }

            if (search && search !== '') { // Якщо search присутній та не порожній
                // Якщо вже є WHERE (тобто є category), використовуємо AND
                if (params.length > 0) {
                    sql += ' AND title LIKE ?';
                } else { // Інакше, використовуємо WHERE
                    sql += ' WHERE title LIKE ?';
                }
                params.push(`%${search}%`); // Додаємо % для пошуку за частиною назви
            }

            const plants = await db.query(sql, params);
            res.json(plants[0]); // MySQL2 повертає результат у першому елементі масиву
        } catch (error) {
            console.error('Error fetching plants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const results = await db.query('SELECT * FROM plants WHERE id = ?', [id]);

            // Перевірка наявності результатів запиту
            if (results[0].length > 0) {
                const complex = results[0][0];
                res.json(complex);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } catch (error) {
            console.error('Error fetching complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            await db.query('DELETE FROM plants WHERE id = ?', [id]);
            res.json({ message: 'Plant deleted successfully' });
        } catch (error) {
            console.error('Error deleting plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req, res) {
        const { title, price, category, des } = req.body;

        try {
            await db.query('INSERT INTO plants (title, price, category, des) VALUES (?, ?, ?, ?)', [title, price, category, des]);
            res.json({ message: 'Plant created successfully' });
        } catch (error) {
            console.error('Error creating plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const { title, price, category, des } = req.body;

        try {
            await db.query('UPDATE plants SET title = ?, price = ?, category = ?, des = ? WHERE id = ?', [title, price, category, des, id]);
            res.json({ message: 'Plant updated successfully' });
        } catch (error) {
            console.error('Error updating plant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new PlantController();
