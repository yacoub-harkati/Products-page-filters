import { useState, useEffect, useRef } from "react"
import productsData from "../db/productsData"

function App() {
	const [searchInput, setSearchInput] = useState("")
	const [filterDAta, setFilterDAta] = useState(productsData)
	const [isOpen, setIsOpen] = useState(true)
	const catsList = productsData
		.map((item) => item.cat)
		.filter((item, i, arr) => arr.indexOf(item) == i)
	const priceList = productsData.map((item) => item.price)
	let maxPrice = Math.max(...priceList)
	let minPrice = Math.min(...priceList)
	let [currentRangeValue, setCurrentRangeValue] = useState(maxPrice)
	const filters = useRef()
	function handleInputChange(e) {
		setSearchInput(e.target.value)
	}

	useEffect(() => {
		if (searchInput == "") {
			setFilterDAta(productsData)
			return
		}
		setFilterDAta((prev) =>
			prev.filter((item) =>
				item.name.toLowerCase().includes(searchInput.toLowerCase())
			)
		)
	}, [searchInput])

	function openSideBAr() {
		filters.current.style.display = "flex"
	}

	function closeSideBAr() {
		filters.current.style.display = "none"
	}

	function manageSideBar() {
		setIsOpen((prev) => !prev)
		isOpen ? closeSideBAr() : openSideBAr()
	}

	function filterCats(e) {
		if (e.target.textContent === "All") setFilterDAta(productsData)
		else if (e.target.textContent === ["All", ...catsList].join("")) {
			return
		} else {
			setFilterDAta(productsData)
			setFilterDAta((prev) =>
				prev.filter(
					(item) =>
						item.cat.toLowerCase() ==
						e.target.textContent.toLowerCase()
				)
			)
		}
	}

	function handleRangeChange(e) {
		setCurrentRangeValue(Number(e.target.value))
		setFilterDAta(productsData)
		setFilterDAta((prev) =>
			prev.filter((item) => item.price <= Number(e.target.value))
		)
	}

	return (
		<div className="App">
			<div className="sidebar">
				<div className="search-input">
					<input
						type="text"
						name="search-input"
						className="input"
						value={searchInput}
						placeholder="Search for products..."
						onChange={handleInputChange}
					/>
					<p className="open-btn" onClick={manageSideBar}>
						{isOpen ? "Close" : "Open"}
					</p>
				</div>
				<div className={`filters`} ref={filters}>
					<p className="title">Categorie</p>
					<div className="cats" onClick={filterCats}>
						{[
							<div className="cat">All</div>,
							catsList.map((item) => (
								<div className="cat">{item}</div>
							)),
						]}
					</div>
					<div className="range">
						<p className="title">Price</p>
						<input
							type="range"
							className="range-slider"
							min={minPrice}
							max={maxPrice}
							onChange={handleRangeChange}
						/>
						<p className="range-price">{currentRangeValue}$</p>
					</div>
				</div>
			</div>
			<div className="products">
				{filterDAta.map((item) => (
					<div className="product">
						<img
							src={item.img}
							className="product-img"
							alt="product-img"
						/>
						<p>{item.name}</p>
						<p>{item.price}$</p>
					</div>
				))}
			</div>
		</div>
	)
}
export default App
