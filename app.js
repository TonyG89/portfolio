const table = document.querySelector(".table-card");
const chips = document.querySelector(".chips");
const loader = document.querySelector("svg");
const dialog = document.getElementById("imageDialog");
const dialogImage = document.getElementById("dialogImage");

let chipsContent = [
	"ALL",
	"HTML",
	"Javascript",
	"Vue",
	"React",
	"Courses",
	"Test Task",
	"My projects",
];

let filterValue = chipsContent[0];

let projectsArray = [];

let filteredData = [];

let filterValueArray = [];
const filtered = (data, filt = filterValue) => {
	const filteredData = data.filter((item) => {
		const lowerCaseDescriptionArray = valueArrayToLowerCase(item.description);
		lowerCaseDescriptionArray.includes(filt.toLowerCase());
	});

	return filteredData;
};

if (!!chips) {
	chipsContent.forEach((chip) => {
		const active =
			chip === "ALL" ? "bg-slate-700 text-lime-300" : "bg-slate-500";
		chips.innerHTML += `<li class="chip hover:text-amber-200 rounded-xl max-sm:text-sm px-2 m-1 text-gray-50 border-2 border-black cursor-pointer ${active}">${chip}</li>`;
	});
	chips.addEventListener("click", (e) => {
		const chip = e.target;
		if (chip.classList.contains("chip")) {
			document.querySelectorAll(".chip").forEach((item) => {
				item.classList.remove("bg-slate-700");
				item.classList.remove("text-lime-300");
				item.classList.add("bg-slate-500");
			});
			chip.classList.add("bg-slate-700");
			chip.classList.add("text-lime-300");
			filterValue = chip.innerText.toLowerCase();
			loadData();

			return filteredData;
		}
	});
}

// ВЫТАЩИТЬ С МАССИВА ОБЪЕКТОВ ИХ ЗНАЧЕНИЯ
const valueFromArrayObject = (arr) => {
	return arr.map((item) => Object.values(item)[0]);
};

const valueArrayToLowerCase = (array) => array.map((str) => str.toLowerCase());

const loadData = async (first = false) => {
	const response = await fetch("./db.json")
		.then((res) => res.json())
		.then((projects) => {
			projectsArray = valueFromArrayObject(projects);

			const processedData = projectsArray.filter((project) => {
				const technologyListLowerCase = valueArrayToLowerCase(project.technologies);
				const typeLowerCase = project.type.toLowerCase();
				const hintLowerCase = project.purpose.toLowerCase();

				return  filterValue.toLowerCase();
				switch (filterValue) {
					case "all":
						return projectsArray;
					case "react":
						return typeLowerCase.includes("react");
					case "courses":
						return typeLowerCase.includes("courses");
					case "test task":
						return hintLowerCase.includes("test task");
					case "my projects":
						return hintLowerCase === "" || hintLowerCase === "freelance";
					default:
						return technologyListLowerCase.includes(filterValue);
				}
			});
			return processedData;
		});

	renderData(response, !first);
};

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

function counter(msg = "") {
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

counter("portfolio");




table.addEventListener("click", (event) => {
	console.log('xxx')
  if (event.target === dialog) {
    dialog.close();
  }
});


const renderData = (data, loaded = true) => {
	const timerFlag = [0, 2000];
	setTimeout(() => {
		if (data.length) {
			for (let project of data) {
				if (project === data[0]) {
					table.innerHTML = "";
				}
				if (project.rate <= 3) {
					loader.style.display = "none";
					const stack = project.technologies;
					let technologiesBlock = "";
					stack.forEach(
						(stack) =>
							(technologiesBlock += `<li class="stack_block text-amber-100 cursor-default text-sm">${stack}</li>`)
					);
					table.innerHTML += `<div
                                        class="card font_fredericka box-border
                                        text-teal-50
                                        w-full
                                        mx-auto
																				relative
                                        border rounded-md mb-4 p-3
                                        flex flex-col justify-start"
                                        >
																				<div class="border-b-4 mt-1 mb-2 pb-1 w-full flex justify-between items-baseline">
                                            <h2 class="text-xl cursor-default stroke_text">
																						${project.title}
																							</h2>
																							<span class="hint cursor-default stroke_text" >
																									${project.purpose}
																								</span>
																								</div>
																						<div class=" cursor-default text-right align-text-top absolute date " style="font-family: 'Caveat', cursive;">${
																							project.created
																						}</div>

<div class="flex flex-col mb-1 pb-2 flex-1 justify-between" style="border-bottom: 2px solid #ffffff6b">
<img src="/images/${project.image_name}.png" alt="${project.title}" class="w-full mt-2 h-auto cursor-pointer" />
<p class="mt-2 mb-auto cursor-default stroke_text">${project.description}</p>
                                           </div> 
																						<ul
                                            class="techno uppercase mb-2 stroke_text"
                                            style="font-family: 'Caveat', cursive;"
                                            >
                                                ${technologiesBlock}
                                            </ul>
                                            <div class="flex mt-auto justify-between place-items-center ">
                                                ${!!project.code && project.isPublic ?`<btn class="btn-code border-2 rounded-xl stroke_text px-2 py-1 border-amber-200 text-amber-200 hover:border-amber-400 hover:text-amber-400 hover:">
                                                    <a class="uppercase" href="${
																											project.code
																										}" target="_blank">Code</a>
                                                </btn>` : ''}
                                                <btn class="btn-demo ml-auto border-2 rounded-xl px-2 py-1 stroke_text border-lime-200 text-lime-200  hover:border-lime-400 hover:text-lime-400 hover:">
                                                    <a class="uppercase" href="${
																											project.demo
																										}" target="_blank">WATCH demo</a>
                                                </btn>
                                            </div>
                                        </div>`;
				}
			}
		}
	}, timerFlag[loaded ? 0 : 1]);
};

table.addEventListener("click", (event) => {

  // Открытие диалога при клике на изображение
  if (event.target.tagName === "IMG" && event.target.classList.contains("cursor-pointer")) {
    dialogImage.src = event.target.src; // Устанавливаем выбранное изображение
    dialog.showModal(); // Показываем диалог
  }

  // Закрытие диалога при клике на него
	// console.log(1,event.target)
	// console.log(2,dialog)
	// console.log(2,dialogImage)
  if (event.target === dialog || event.target === dialogImage) {
    dialog.close();
  }
});

document.addEventListener("click", (event) => {
	console.log(event.target)
	if (event.target === dialog || event.target === dialogImage) {
    dialog.close();
  }
	
});

loadData(true);
// popup()
// const refreshData = async () => {
//     // loadData()
//     setTimeout(() => {

//         renderData(projectsArray)
//     }, 1500)
// }

// refreshData()
