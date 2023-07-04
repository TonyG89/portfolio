const table = document.querySelector('.table-card')


fetch("./db.json")
    .then(res => res.json())
    .then(data => {
        const arr = data[0]
        for (let name in arr) {
            if (arr[name].rate < 3) {
                const stack = arr[name].description
                let stackBlock = ""
                stack.forEach(stack => stackBlock += `<li class="hover:text-amber-100 cursor-pointer text-lg">${stack}</li>`)
                table.innerHTML += `<div 
                                class="card box-border
                                text-teal-50
                                border rounded-md mb-10 p-3 mx-2
                                w-[236px]
                                flex flex-col justify-between
                                "
                                style="font-family: 'Fredericka the Great', cursive;"
                                >
                                    <div class="">
                                        <h2 class="text-2xl mb-2 border-b-4 w-full relative">${name}<span class="text-amber-300 text-right align-text-top absolute date " style="font-family: 'Caveat', cursive;">${arr[name].create}</span></h2>
                                        <div 
                                        class="uppercase"
                                        style="font-family: 'Caveat', cursive;"
                                        >${stackBlock}
                                        </div>
                                    </div>
                                    <div class="flex justify-between mt-4">
                                        <div class="btn-code border-2 rounded-xl px-2 py-1                  border-amber-200 text-amber-200 hover:border-amber-400 hover:text-amber-400 hover:">
                                            <a href="${arr[name].code}" target="_blank">Code</a>
                                        </div>
                                        <div class="btn-demo border-2 rounded-xl px-2 py-1                  border-lime-200 text-lime-200  hover:border-lime-400 hover:text-lime-400 hover:">           
                                            <a href="${arr[name].demo}" target="_blank">Demo</a>
                                            </div>
                                        </div>
                                    </div>`
            }
        }

    })