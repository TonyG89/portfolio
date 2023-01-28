const table = document.querySelector('.table-card')


fetch("./db.json")
    .then(res => res.json())
    .then(data => {
        const arr = data[0]

        for (let name in arr) {
            if (arr[name].rate < 3) {
                const stack = arr[name].description
                let stackBlock = ""
                stack.forEach(stack => stackBlock += `<li>${stack}</li>`)
                table.innerHTML += `<div 
                                class="card box-border
                                text-teal-50
                                border rounded-md mb-10 p-3 mx-2
                                w-[240px]
                                flex flex-col justify-between
                                "
                                style="font-family: 'Fredericka the Great', cursive;"
                                >
                                    <div class="">
                                        <h2 class="text-2xl mb-2 border-b-4">${name}</h2>
                                        <div 
                                        style="font-family: 'Caveat', cursive;"
                                        >${stackBlock}
                                        </div>
                                    </div>
                                    <div class="buttons flex justify-between mt-10">
                                        <div class="btn-code border-2 rounded-xl px-2 py-1                  border-amber-200 text-amber-200 hover:border-amber-400 hover:text-amber-400 hover:">
                                            <button>Code</button>
                                        </div>
                                        <div class="btn-demo border-2 rounded-xl px-2 py-1                  border-lime-200 text-lime-200  hover:border-lime-400 hover:text-lime-400 hover:">           
                                            <button>Demo</button>
                                            </div>
                                        </div>
                                    </div>`
            }
        }

    })