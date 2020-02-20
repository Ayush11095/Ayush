# Ayush

#RestFul API using express and mongodb

we are going to cover all these modules which is mentioned below:-

	config.json ==> this file is used to configure mongodb.
	controllers ==> This folder contain controller.js file which holds basic CURD functions.
	models ==> This folder contain user.js file which holds schema.
	node_modules ==> This folder contains all node modules.
	README.md ==> This document contains the basic structure of Assignment.
	app.js ==> This js file contains get, post etc CURD operation.

ROUTES are mentioned below:-

1. /api/auth
		(this route register the new user by getng there few details which is mentioned below)
			i) /api/auth/register
					parameters -
						firstname,
						lastname,
						email,
						password,
						userID is auto generated.
			ii) /api/auth/login 
					paramters - 
						email, 
						password (should be verify by token stored in db)

2. /api/products
		(this route POST the product description including id,name,description and reviews and stored the info in db)
			Parameters - 
				prod_id,
				prod_name,
				prod_desc,
				reviews,
				user_id (token)

3. /api/reviews
		(this route get information of product from db by passing prod_id parameter in url)
			parameters -
				req.params.id (pass in url) and GET information of product.

