const displayStatus = (containerId, status) => {
    const container = document.getElementById(containerId);
    container.style.display = status;
}

const loading = (status) => {
    if (status) {
        displayStatus("loadingContainer", "none");
        displayStatus("issuesContainer", "flex");
    }
    else {
        displayStatus("issuesContainer", "grid");
        displayStatus("loadingContainer", "none");
    }
}

const deactivateAllTabs = () => {
    const tabsBtn = document.getElementsByClassName("tabsBtn");
    for (const tabBtn of tabsBtn) {
        tabBtn.classList.replace("btn-primary", "btn-outline-soft")
        tabBtn.classList.replace("text-neutral-100", "text-neutral-600")
    }
}

const switchTabs = async (tab) => {
    const allSwitchBtn = document.getElementById("allSwitchBtn");
    const openSwitchBtn = document.getElementById("openSwitchBtn");
    const closeSwitchBtn = document.getElementById("closeSwitchBtn");
    // console.log(tabsBtn)
    if (tab === "All") {
        deactivateAllTabs();
        loading(true);
        allSwitchBtn.classList.replace("btn-outline-soft", "btn-primary");
        allSwitchBtn.classList.replace("text-neutral-600", "text-neutral-100");
        
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        
        countIssues(data.data);
        loading(false);
    }
    else if (tab === "Open") {
        deactivateAllTabs();
        loading(true);
        openSwitchBtn.classList.replace("btn-outline-soft", "btn-primary");
        openSwitchBtn.classList.replace("text-neutral-600", "text-neutral-100");
        
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        
        countIssues(data.data.filter(issue => issue.status === "open"));
        loading(false);
    }
    else if (tab === "Closed") {
        deactivateAllTabs();
        loading(true);
        closeSwitchBtn.classList.replace("btn-outline-soft", "btn-primary");
        closeSwitchBtn.classList.replace("text-neutral-600", "text-neutral-100");
        
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        
        countIssues(data.data.filter(issue => issue.status === "closed"));
        loading(false);
    }
}

const countIssues = (issues) => {
    const IssuesFound = document.getElementById("IssuesFound");
    IssuesFound.innerText = issues.length;
    loadAllData(issues)
}

const loadAllData = (issues) => {
    const issuesContainer = document.getElementById("issuesContainer");
    issuesContainer.innerHTML = "";
    issues.forEach(issue => {
        issuesContainer.innerHTML += `
            <div class="bg-base-100 rounded-xl border-t-4 ${issue.status === "open" ? "border-success" : "border-purple"} shadow-md shadow-neutral-200 hover:scale-[1.02] transition cursor-pointer" onclick="loadIssueDetails(${issue.id})">
                <div class="p-4 space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/${issue.status === 'open' ? 'Open-Status.png' : 'Closed- Status .png'}" alt="open" class="w-6 h-6">
                        <div class="badge ${issue.priority === "high" ? "bg-error/20 text-error" : issue.priority === "medium" ? "bg-warning/20  text-warning" : "bg-neutral-content text-neutral-400"}  w-20 font-medium rounded-full text-sm">${issue.priority.toUpperCase()}</div>
                    </div>
                    <h3 class="font-semibold text-neutral-800">${issue.title}</h3>
                    <p class="text-neutral-500 text-sm">${issue.description}</p>
                    <div id="issueLabels-${issue.id}" class="flex flex-wrap gap-2">
                        
                    </div>
                </div>
                <hr class="text-neutral-200">
                <div class="p-4 space-y-2">
                    <p class="text-neutral-500">#${issue.id}by ${issue.author}</p>
                    <p class="text-neutral-500">${issue.updatedAt}</p>
                </div>
            </div>
        `;

        // labels adding
        let issueLabels = document.getElementById(`issueLabels-${issue.id}`);
        issueLabels.innerHTML = "";
        issue.labels.forEach(label => {
            if (label == "bug") {
                issueLabels.innerHTML += `
                    <div class="badge bg-error/20 border-error border-[0.5px] text-sm text-error font-medium rounded-full">
                        <img src="./assets/bug.png" alt="">
                        BUG
                    </div>
                `
                // console.log(issueLabels.innerHTML) 
            }
            else if (label == "help wanted") {
                issueLabels.innerHTML += `
                    <div class="badge bg-warning/20 border-warning border-[0.5px] text-sm text-warning font-medium rounded-full">
                        <img src="./assets/help.png" alt="">
                        HELP WANTED
                    </div>
                `
            }
            else {
                issueLabels.innerHTML += `
                    <div class="badge bg-success/20 border-success border-[0.5px] text-sm text-success font-medium rounded-full">
                        <img src="./assets/enhancement.png" alt="">
                        ${label}
                    </div>
                `
            }
        })
    });
}

const loadSearchResults = async () => {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim().toLowerCase();
    deactivateAllTabs()
    loading(true)
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const data = await res.json();
    countIssues(data.data);
    loading(false);
}

const loadIssueDetails = async (issueId) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
    const res = await fetch(url);
    const data = await res.json();
    showIssueDetails(data.data);
}

const showIssueDetails = (issueData) => {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML ="";
    modalContainer.innerHTML = `
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box space-y-5">
                <h3 class="text-2xl font-bold">${issueData.title}</h3>
                <div class="flex gap-2 items-center">
                    <div class="badge ${issueData.status === "open" ?"bg-success":"bg-error"} mt-1 rounded-full text-neutral-100">${issueData.status==="open" ? "Opened":"Closed"}</div>
                    <p class="text-neutral-500 text-sm font-semibold">· Opened By ${issueData.author} · 22/02/  2026</p>
                </div>
                <div class="flex flex-wrap gap-2" id="modalLabelContainer">
                    
                </div>
                <div>
                    <p class="mt-5 text-neutral-500 text-lg text-medium leading-7">${issueData.description}</p>
                    <div class="bg-base-200 p-6 w-full mt-5 flex">
                        <div class="flex-1">
                            <p class="text-neutral-500 text-lg text-medium leading-7">Assignee:</p>
                            <h3 class="text-neutral-800 font-semibold text-lg">${issueData.assignee?issueData.assignee:"Assignee Not Found"}</h3>
                        </div>
                        <div class="flex-1">
                            <p class="text-neutral-500 text-lg text-medium leading-7">Priority:</p>
                            <div class="badge ${issueData.priority === "high" ? "bg-error text-neutral-100" : issueData.priority === "medium" ? "bg-warning  text-neutral-100" : "bg-neutral-content text-neutral-400"}  w-20 font-medium rounded-full text-sm">${issueData.priority.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-primary shadow-none">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;

    let modalLabelContainer = document.getElementById(`modalLabelContainer`);
        modalLabelContainer.innerHTML = "";
        issueData.labels.forEach(label => {
            if (label == "bug") {
                modalLabelContainer.innerHTML += `
                    <div class="badge bg-error/20 border-error border-[0.5px] text-sm text-error font-medium rounded-full">
                        <img src="./assets/bug.png" alt="">
                        BUG
                    </div>
                `
                // console.log(issueLabels.innerHTML) 
            }
            else if (label == "help wanted") {
                modalLabelContainer.innerHTML += `
                    <div class="badge bg-warning/20 border-warning border-[0.5px] text-sm text-warning font-medium rounded-full">
                        <img src="./assets/help.png" alt="">
                        HELP WANTED
                    </div>
                `
            }
            else {
                modalLabelContainer.innerHTML += `
                    <div class="badge bg-success/20 border-success border-[0.5px] text-sm text-success font-medium rounded-full">
                        <img src="./assets/enhancement.png" alt="">
                        ${label}
                    </div>
                `
            }
        })
    my_modal_5.showModal();
}