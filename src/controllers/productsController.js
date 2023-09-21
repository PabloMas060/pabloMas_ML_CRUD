db = require('../database/models')

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		const { name, price, description, discount, category } = req.body;

		db.Product.create({
			name: name.trim(),
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: req.file ? req.file.filename : null
		})
			.then(() => {
				return res.redirect('/products')
			})
			.catch(error => console.log(error))

	},

	// Update - Form to edit
	edit: (req, res) => {
		
		const product = db.Product.findByPk(req.params.id)
			.then((product) => {
				return res.render('product-edit-form', {
					...product.dataValues
				})
			})
			.catch(error => console.log(error))


		
	},
	// Update - Method to update
	update: (req, res) => {

		const { name, price, description, discount, category } = req.body

		const productModified = db.Product.update({
			name : name.trim(),
				price : +price,
				discount : +discount,
				category,
				description : description.trim()
		},
		{
			where : {id : req.params.id}
		})
			.then((productModified) => {
				return res.redirect('/products')
			})
			.catch(error => console.log(error))





/* 
		const productsModify = products.map(product => {

			if (product.id === +req.params.id) {
				product.name = name.trim()
				product.price = +price
				product.discount = +discount
				product.category
				product.description = description.trim()
			}


			return product
		})

		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsModify, null, 3))

		return res.redirect('/products') */
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const id = req.params.id
		const productsModify = products.filter(product => product.id !== +id);


		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsModify, null, 3));

		return res.redirect('/products');
	}
};

module.exports = controller;