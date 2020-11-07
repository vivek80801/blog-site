try {
	const deleteBtn = document.getElementById("delete");

	deleteBtn.addEventListener("click", async () => {
		const id = deleteBtn.getAttribute("data-test");
		try {
			const res = await fetch(`/blog/blog/${id}`, {
				method: "DELETE",
			});
			console.log(res);
		} catch (err) {
			console.log("error => " + err);
		}
	});
} catch (error) {
	console.log("button with id delete not found");
}
