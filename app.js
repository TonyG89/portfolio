const table = document.querySelector('.table-card')
const chips = document.querySelector('.chips')
const loader = document.querySelector('svg')


let chipsContent = ['ALL', 'HTML', 'Javascript', 'Vue', 'React', 'Courses', 'Test Task', 'My projects']

let filterValue = chipsContent[0]

let projectsArray = []

let filteredData = []

let filterValueArray = []
const filtered = (data, filt = filterValue) => {

    const filteredData = data.filter((item) => {
        const lowerCaseDescriptionArray = valueArrayToLowerCase(item.description)
        lowerCaseDescriptionArray.includes(filt.toLowerCase())
    })

    return filteredData
}


chipsContent.forEach(chip => {
    const active = chip === 'ALL' ? 'bg-slate-700 text-lime-300' : 'bg-slate-500'
    chips.innerHTML += `<li class="chip hover:text-amber-200 rounded-xl max-sm:text-sm px-2 m-1 text-gray-50 border-2 border-black cursor-pointer ${active}">${chip}</li>`
})
chips.addEventListener('click', (e) => {
    const chip = e.target
    // срабатывает при клике на чипсы
    if (chip.classList.contains('chip')) {
        document.querySelectorAll('.chip').forEach(item => {
            item.classList.remove('bg-slate-700')
            item.classList.remove('text-lime-300')
            item.classList.add('bg-slate-500')
        })
        chip.classList.add('bg-slate-700')
        chip.classList.add('text-lime-300')
        // const lowerCaseChips = chipsContent.map(item => item.toLocaleLowerCase() === chip.innerText.toLowerCase() && filterValueArray.push(item))
        filterValue = chip.innerText.toLowerCase()
        loadData()


        return filteredData
    }
})

// ВЫТАЩИТЬ С МАССИВА ОБЪЕКТОВ ИХ ЗНАЧЕНИЯ
const valueFromArrayObject = (arr) => {
    return arr.map(item => Object.values(item)[0])
}

// ПЕРЕБРАТ МАССИВ ЧТОБ УБРАТЬ СДЕЛАВ ВСЕ ЗНАЧЕНИЯ С МАЛЕНЬКОЙ БУКВЫ
const valueArrayToLowerCase = (array) => array.map(str => str.toLowerCase())

const loadData = async (first = false) => {
    const response = await fetch("./db.json")
        .then(res => res.json())
        .then(projects => {

            projectsArray = valueFromArrayObject(projects)

            const processedData = projectsArray.filter(project => {
                const descriptionLowerCase = valueArrayToLowerCase(project.description)
                const typeLowerCase = project.type.toLowerCase()
                const hintLowerCase = project.hint.toLowerCase()

                filterValue = filterValue.toLowerCase()
                switch (filterValue) {
                    case 'all':
                        return projectsArray
                    case 'react':
                        return typeLowerCase.includes('react')
                    case 'courses':
                        return typeLowerCase.includes('courses')
                    case 'test task':
                        return hintLowerCase.includes('test task')
                    case 'my projects':
                        return hintLowerCase === '' || hintLowerCase === 'freelance'
                    default: return descriptionLowerCase.includes(filterValue)
                }
            })
            return processedData
        })

    renderData(response, !first)
}

const countData = (resource = '') => {
    const client = new ClientJS()
    const fingerprint = client.getFingerprint()
    console.log('pid-' + fingerprint)
    const dateNow = new Date().toString().slice(4, 24)
    return {
        createdAt: dateNow,
        desc: resource,
        clientId: fingerprint,
    }
}

const cvClass = document.querySelector('.cv')

cvClass.addEventListener('click', () => counter('portfolio->cv'))

function counter(msg = '') {
    fetch('https://634becd4d90b984a1e422fcb.mockapi.io/portfolio_counter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(countData(msg))
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).catch(error => console.log(error))
}

counter('portfolio')

const renderData = (data, loaded = true) => {
    const timerFlag = [0, 2000]
    setTimeout(() => {
        if (data.length) {
            for (let project of data) {
                if (project === data[0]) {
                    table.innerHTML = ''
                }
                if (project.rate <= 3) {
                    loader.style.display = 'none'
                    const stack = project.description
                    let stackBlock = ""
                    stack.forEach(stack => stackBlock += `<li class="hover:text-amber-100 cursor-pointer text-lg">${stack}</li>`)
                    table.innerHTML += `<div
                                        class="card box-border
                                        text-teal-50
                                        w-full
                                        mx-auto
                                        border rounded-md mb-4 p-3
                                        flex flex-col justify-start"
                                        style="font-family: 'Fredericka the Great', cursive;"
                                        >
                                            <h2 class="text-xl mt-2 border-b-4 w-full relative">${project.title}<span class="text-amber-300 text-right align-text-top absolute date " style="font-family: 'Caveat', cursive;">${project.created}</span></h2>
                                            <ul
                                            class="uppercase list-disc ml-6 my-2"
                                            style="font-family: 'Caveat', cursive;"
                                            >
                                                ${stackBlock}
                                            </ul>
                                            <div class="flex mt-auto justify-between place-items-center mt-4">
                                                <btn class="btn-code border-2 rounded-xl px-2 py-1 border-amber-200 text-amber-200 hover:border-amber-400 hover:text-amber-400 hover:">
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
        }

    }, timerFlag[loaded ? 0 : 1])
}

loadData(true)
// const refreshData = async () => {
//     // loadData()
//     setTimeout(() => {

//         renderData(projectsArray)
//     }, 1500)
// }

// refreshData()
