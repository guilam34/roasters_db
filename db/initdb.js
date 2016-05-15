db.Coffee.drop()
db.createCollection("Coffee", { autoIndexID: true })
db.Coffee.createIndex({
	name: "text",
	desc: "text",
	roaster: "text"
})
