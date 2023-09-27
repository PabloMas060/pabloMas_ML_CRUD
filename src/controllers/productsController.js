db = require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator');

const controller = {
	// Root - Show all products



	index: (req, res) => {
		db.Product.findAll()
			.then(products => {
				return res.render('products', {
					products,
					toThousand
				})
			})

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		db.Product.findByPk(req.params.id)
			.then(product => {
				return res.render('detail', {
					...product.dataValues,
					toThousand
				})
			})

	},

	// Create - Form to create
	create: (req, res) => {
		db.Category.findAll()
			.then(categories => {
				return res.render('product-create-form', {
					categories
				})
			})
			.catch(error => console.log(error))

	},

	// Create -  Method to store
	store: (req, res) => {

		const errors = validationResult(req);


		if (errors.isEmpty()) {
			const categories = db.Category.findAll()
				.then(categories => {
					const { name, price, description, discount, categoryId } = req.body;

					db.Product.create({
						name: name.trim(),
						price,
						discount: discount || 0,
						categoryId,
						description: description.trim(),
						image: req.file ? req.file.filename : null
					})
						.then(() => {
							return res.redirect('/products')
						})
				})

				.catch(error => console.log(error))
		}
		else {
			db.Category.findAll()
				.then(categories => {
					return res.render('product-create-form', {
						categories,
						errors: errors.mapped(),
						old: req.body
					})
				})
				.catch(error => console.log(error))

		}



	},

	// Update - Form to edit
	edit: (req, res) => {

		const categories = db.Category.findAll()
		const product = db.Product.findByPk(req.params.id)

		Promise.all([categories, product])
			.then(([categories, product]) => {
				return res.render('product-edit-form', {
					categories,
					...product.dataValues
				})
			})
			.catch(error => console.log(error))



	},
	// Update - Method to update
	update: (req, res) => {

		const { name, price, description, discount, categoryId } = req.body

		db.Product.update({
			name: name.trim(),
			price,
			discount,
			categoryId,
			description: description.trim(),
			/* MODIFICAR PARA QUE UPDATEE IMAGENES */
		},
			{
				where: { id: req.params.id }
			})
			.then(() => {
				return res.redirect('/products/detail/' + req.params.id)
			})
			.catch(error => console.log(error))
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		db.Product.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(() => {
				return res.redirect('/products')
			})
			.catch(error => console.log(error))

	}
};

module.exports = controller;