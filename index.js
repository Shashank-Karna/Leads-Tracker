let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById('input-btn')
const tabBtn = document.getElementById('tab-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    

})

function render(leads) {
    let listItems = ""
    for (let i=0; i<leads.length; i++) {
        //ulEl.innerHTML += '<li>' + leads[i] + '</li>'

        //listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>"

        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`

        /*
        const  li = document.createElement('li')
        li.textContent = leads[i]
        ulEl.append(li)
        */
    }

    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value) 
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(yLeads)
})
