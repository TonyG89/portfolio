const countData = (resource = "") => {
	const client = new ClientJS();
	const fingerprint = client.getFingerprint();
	// console.log("pid-" + fingerprint);
	const dateNow = new Date().toString().slice(4, 24);
	return {
		createdAt: dateNow,
		desc: resource,
		clientId: fingerprint,
	};
};

const cvClass = document.querySelector(".cv");

cvClass.addEventListener("click", () => counter("portfolio->cv"));
counter("portfolio");
export default function counter(msg = "") {
	fetch("https://634becd4d90b984a1e422fcb.mockapi.io/portfolio_counter", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(countData(msg)),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.catch((error) => console.log(error));
}
