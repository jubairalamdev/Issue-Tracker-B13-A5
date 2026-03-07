// console.log("Angta lagai disi")

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => countIssues(data.data))

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
            <div class="bg-base-100 rounded-xl border-t-4 border-success shadow-md shadow-neutral-200">
                <div class="p-4 space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="open" class="w-6 h-6">
                        <div class="badge ${issue.priority === "high" ? "bg-error/20 text-error" : issue.priority === "medium" ? "bg-warning/20  w-20" : "bg-neutral-content text-neutral-700"}  w-20 font-medium rounded-full text-sm">${issue.priority.toUpperCase()}</div>
                    </div>
                    <h3 class="font-semibold text-neutral-800">${issue.title}</h3>
                    <p class="text-neutral-500 text-sm">${issue.description}</p>
                    <div id="issueLabels">
                        
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
        // let issueLabels = document.getElementById("issueLabels");
        // issueLabels = "";
        // issue.labels.forEach(label => {
        //     if (label === "bug") {
        //         issueLabels.innerHTML += `
        //             <div class="badge bg-error/20 border-error border-[0.5px] text-sm text-error font-medium rounded-full">
        //                 <img src="./assets/bug.png" alt="">
        //                 BUG
        //             </div>
        //         `
        //     }
        //     else if (label === "help wanted") {
        //         issueLabels.innerHTML += `
        //             <div class="badge bg-warning/20 border-warning border-[0.5px] text-sm text-warning font-medium rounded-full">
        //                 <img src="./assets/help.png" alt="">
        //                 HELP WANTED
        //             </div>
        //         `
        //     }
        //     else {
        //         issueLabels.innerHTML += `
        //             <div class="badge bg-success/20 border-success border-[0.5px] text-sm text-success font-medium rounded-full">
        //                 <img src="./assets/enhancement.png" alt="">
        //                 ${label}
        //             </div>
        //         `
        //     }
        // })
    });
}