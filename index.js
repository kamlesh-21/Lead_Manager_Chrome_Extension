// Declaring an empty array
let myLeads = []

// capturing elements for DOM manipulation 
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const savebtn = document.getElementById("save-btn")
//converting string to its original form  and storing it in a local variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//checking if the local varibale has any entries, and extrapolating this to array
if (leadsFromLocalStorage) {

    myLeads = leadsFromLocalStorage

    render(myLeads)
}

savebtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentwindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

//function to display entries
function render(leads) {
    //creating local variable to store values for display & to avoid DOM manipulation on every loop
    let listItems = ""
    //looping through the parameter's length and appneding it in local variable with list tags 
    for (let i=0; i<leads.length; i++) {
        listItems += `<li><a href=${leads[i]} target="_blank">${leads[i]}</a></li>`
    }
    //changing the UL element with local variable in HTML form
    ulEl.innerHTML = listItems
}


//function to delete all data
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//storing input into the array 
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    
    // clearing input field
    inputEl.value = ""

    //persistently storing the value in string format from input field onto localstorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    //calling function to display saved inputs
    render(myLeads)
})











