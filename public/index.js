try {
	const deleteBtn = document.getElementById("delete");
	// const mess = document.querySelector("span");

	deleteBtn.addEventListener("click", async () => {
		const id = deleteBtn.getAttribute("data-test");
		try {
			const res = await fetch(`/blog/blog/${id}`, {
				method: "DELETE",
			});
			console.log(res);
			// const data = await res.json();
			// console.log(data);
			// mess.innerText = JSON.parse(data).msg;
		} catch (err) {
			console.log("error => " + err);
		}
	});
} catch (error) {
	console.log("button with id delete not found");
}
