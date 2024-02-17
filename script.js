let searchResults = document.getElementById("searchResults");
let searchInput = document.getElementById("searchInput");
let spinner =  document.getElementById("spinner");

function searchResult(result){
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResults.appendChild(resultItem);
    
    let title = document.createElement("h1");
    title.textContent = result.title;
    title.classList.add("result-title");
    resultItem.appendChild(title);
    
    let link = document.createElement("a");
    link.textContent = result.link;
    link.href = result.link;
    link.classList.add("result-url");
    resultItem.appendChild(link);
    
    let description = document.createElement("p");
    description.textContent = result.description;
    description.classList.add("link-description");
    resultItem.appendChild(description);
}


searchInput.onkeydown = function(event){
    if(event.key === "Enter"){
        searchResults.textContent = "";
        spinner.classList.remove("d-none");
        
        let wordToSearch = searchInput.value;
        let requestUrl = `https://apis.ccbp.in/wiki-search?search=${wordToSearch}`;
        let options = {
            method : "GET",
        };
        
        fetch(requestUrl, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            spinner.classList.add("d-none");
            let results = jsonData.search_results;
            for(let result of results){
                searchResult(result);
            }
            console.log(results);
        });
        
    searchInput.value = "";
    }
    
};