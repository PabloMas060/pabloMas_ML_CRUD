/* base de datos */
const db = require('../database/models')


const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		const visited = db.Product.findAll({
			where: {
				categoryId: 1
			}
		});
		const sale = db.Product.findAll({
			where: {
				categoryId: 2
			}
		})

		Promise.all([visited, sale])
			.then(([visited, sale]) => {
				return res.render('index', {
					visited,
					sale,
					toThousand
				})
			})
			.catch(error => console.log(error))
	},

	search: (req, res) => {
		const keywords = req.query.keywords
		const results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))


		return res.render('results', {
			results,
			toThousand,
			keywords
		})
	},
};

module.exports = controller;
