const fetchData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const list = document.getElementById("data-list");
    list.innerHTML = "";  // Clear the list before adding new items

    data.products.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = `${item.title} - $${item.price}`;  // Display item name and price
      list.appendChild(li);  // Append the item to the list

      console.log(item);  // Log the item in the console
    });
  } catch (err) {
    console.error("I have an error: ", err);  // Error handling
  }
};

fetchData();  // Call the function to fetch data
