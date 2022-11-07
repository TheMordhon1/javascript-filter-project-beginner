const data = [
	{
		id: 1,
		image: "https://m.media-amazon.com/images/I/81uIFAac-UL._AC_UY550_.jpg",
		name: "Men's Active Moisture Wicking Sport Pant",
		price: 20,
		category: "sport"
	},
	{
		id: 2,
		image: "https://m.media-amazon.com/images/I/81zvz5ErWXL._AC_UX679_.jpg",
		name: "Women's Long Sequin Dress with Flutter Sleeves",
		price: 80,
		category: "dress"
	},
	{
		id: 3,
		image: "https://m.media-amazon.com/images/I/61noEBLAe9L._AC_UY550_.jpg",
		name: "Women’s Casual Dresses with Professional Flair",
		price: 66,
		category: "dress"
	},
	{
		id: 4,
		image: "https://m.media-amazon.com/images/I/610V6NG539L._AC_UY695_.jpg",
		name: "Mens Sports Polarized Sunglasses UV Protection Sunglasses for Men 8177s",
		price: 24,
		category: "sport"
	},
	{
		id: 5,
		image: "https://m.media-amazon.com/images/I/617YtStxWVL._AC_UX679_.jpg",
		name: "Tissot mens Luxury Stainless Steel Dress Watch Brown T0864071603700",
		price: 399,
		category: "luxury"
	},
	{
		id: 6,
		image: "https://m.media-amazon.com/images/I/61bbCvm2EkL._AC_UY550_.jpg",
		name: "Women's Casual Blazers Long Sleeve Open Front Button Work Office Blazer Jackets with Pockets",
		price: 44,
		category: "casual"
	},
]

const productContainer = document.querySelector('.content');
const searchInput = document.querySelector('.search-input');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.price-range');
const priceValue = document.querySelector('.price-value');

const displayProduct = (filteredProduct) => {
	productContainer.innerHTML = filteredProduct.map( product => `
		<div class="product">
			<img src=${product.image}>
			<div class="name">${product.name}</div>
			<div class="price">$ ${product.price}</div>
		</div>
	`).join("")
}

displayProduct(data);

searchInput.addEventListener("keyup", (e) => {
	const value = e.target.value.toLowerCase();

	if(value) {
		displayProduct(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1));
	}else {
		displayProduct(data)
	}
})

const setCategories = () => {
	const allCats = data.map(item => item.category);
	const categories =[
		"all",
			...allCats.filter((item, i) =>{
				return allCats.indexOf(item) === i;
			})
	];

	categoriesContainer.addEventListener("click", (e) => {
		const selectedCategory = e.target.textContent;

		selectedCategory === "all"
			? displayProduct(data)
			: displayProduct(data.filter(item => item.category === selectedCategory));
	});

	categoriesContainer.innerHTML = categories.map(cat => `
		<span class="cat">${cat}</span>
	`).join("");
}

const setPrices = () => {
	const priceList = data.map(item => item.price);
	const minPrice = Math.min(...priceList);
	const maxPrice = Math.max(...priceList);

	priceRange.min = minPrice;
	priceRange.max = maxPrice;
	priceRange.value = maxPrice;
	priceValue.textContent = "$" + maxPrice;

	priceRange.addEventListener("input", (e) => {
		priceValue.textContent = "$" + e.target.value;
		displayProduct(data.filter(item => item.price <= e.target.value))
	})
}

setCategories();
setPrices();