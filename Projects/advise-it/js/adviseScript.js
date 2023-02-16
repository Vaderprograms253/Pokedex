const btn = document.getElementById("addFall");
btn.addEventListener("click", appendFallClasses)

function appendFallClasses()
{
    const node = document.createElement("li");
    const classAdded = document.getElementById("fall-class");
    node.appendChild(classAdded);
    document.getElementById("fall-list").appendChild(node);
}

function alerting()
{
    alert("Test");
}