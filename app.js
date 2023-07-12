const table = document.querySelector('.table-card')
const chips = document.querySelector('.chips')


// let chipsContent = ['HTML', 'Javascript', 'Vue', 'React', 'Courses', 'Only my code']

// let filterValue = 'javascript'

// let filterValueArray = []
// const filtered = (data, filt = filterValue) => {
//     console.log(data)
//     // const filteredData = data.filter((item) => item.description.includes(filt.toLowerCase()))
//     // console.log(filteredData)
//     // return filteredData
// }


// chipsContent.forEach(chip => {
//     chips.innerHTML += `<li class="chip rounded-xl px-2 m-1 bg-slate-700 text-gray-50 border-2 border-black cursor-pointer" >${chip}</li>`
// })
// chips.addEventListener('click', (e) => {
//     const chip = e.target
//     // срабатывает при клике на чипсы
//     if (chip.classList.contains('chip')) {
//         // const lowerCaseChips = chipsContent.map(item => item.toLocaleLowerCase() === chip.innerText.toLowerCase() && filterValueArray.push(item))
//         filterValue = chip.innerText.toLowerCase()
//         loadData()
//         console.log(filterValue)
//         return filterValue
//     }
// })

// ВЫТАЩИТЬ С МАССИВА ОБЪЕКТОВ ИХ ЗНАЧЕНИЯ
const valueFromArrayObject = (arr) => {
    return arr.map(item => Object.values(item)[0])
}
const loadData = () => {
    fetch("./db.json")
        .then(res => res.json())
        .then(projects => {
            console.log(projects)
            const projectsArray = valueFromArrayObject(projects)
            console.log(projectsArray)
            // const processedData = projectsArray.filter(project => project.description.includes(filterValue))
            // console.log(processedData)

            for (let project of projectsArray) {

                console.log(project)
                if (project.rate < 4) {
                    const stack = project.description
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
                                <h2 class="text-xl my-2 border-b-4 w-full relative">${project.title}<span class="text-amber-300 text-right align-text-top absolute date " style="font-family: 'Caveat', cursive;">${project.create}</span></h2>
                                <div
                                class="uppercase"
                                style="font-family: 'Caveat', cursive;"
                                >${stackBlock}
                                </div>
                                </div>
                                <div class="flex justify-between place-items-center mt-4">
                                <btn class="btn-code border-2 rounded-xl px-2 py-1                  border-amber-200 text-amber-200 hover:border-amber-400 hover:text-amber-400 hover:">
                                            <a href="${project.code}" target="_blank">Code</a>
                                            </btn>
                                            <div class="hint"><span>${project.hint && 'project'}</span><br>${project.hint ?? ''}</div>
                                            <btn class="btn-demo border-2 rounded-xl px-2 py-1                  border-lime-200 text-lime-200  hover:border-lime-400 hover:text-lime-400 hover:">
                                            <a href="${project.demo}" target="_blank">Demo</a>
                                            </btn>
                                            </div>
                                            </div>`
                }
            }
        })
}
loadData()