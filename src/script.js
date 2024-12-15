// var menuLinks = [
//     { text: 'about', href: '/about' },
//     { text: 'catalog', href: '/catalog' },
//     { text: 'orders', href: '/orders' },
//     { text: 'account', href: '/account' },
// ];

var menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog',
        href: '#',
        subLinks: [
            {
                text: 'all',
                href: '/catalog/all'
            },
            {
                text: 'top selling',
                href: '/catalog/top'
            },
            {
                text: 'search',
                href: '/catalog/search'
            },
        ]
    },
    {
        text: 'orders',
        href: '#',
        subLinks: [
            {
                text: 'new',
                href: '/orders/new'
            },
            {
                text: 'pending',
                href: '/orders/pending'
            },
            {
                text: 'history',
                href: '/orders/history'
            },
        ]
    },
    {
        text: 'account',
        href: '#',
        subLinks: [
            {
                text: 'profile',
                href: '/account/profile'
            },
            {
                text: 'sign out',
                href: '/account/signout'
            },
        ]
    },
];

let mainEl = document.querySelector("main")
mainEl.style.backgroundColor = "var(--main-bg)"


let title = document.createElement("h1")
title.textContent = "DOM Manipulation"

mainEl.appendChild(title)
mainEl.classList.add("flex-ctr")
// console.log(mainEl);


let topMenuEl = document.querySelector("#top-menu")
topMenuEl.style.height = "100%"
topMenuEl.style.backgroundColor = "var(--top-menu-bg)"
topMenuEl.classList.add("flex-around")




menuLinks.forEach(link => {
    let a = document.createElement("a")
    a.hasAttribute(`href`, link[1])
    a.textContent = link.text
    topMenuEl.appendChild(a)
})

let subMenuEl = document.querySelector("#sub-menu")
subMenuEl.style.height = "100%"
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)"
subMenuEl.classList.add("flex-around")
subMenuEl.style.position = "absolute"
subMenuEl.style.top = 0


let topMenuLinks = document.querySelectorAll("#top-menu a")
// console.log(topMenuLinks);

topMenuEl.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.localName !== "a") {
        return
    }

    e.target.classList.toggle("active")


    topMenuLinks.forEach((aTag) => {
        if (aTag !== e.target) {
            aTag.classList.remove("active")

        }
    })

    // console.log(e.target.classList.contains("active"));
    
    let isActive = e.target.classList.contains("active")
    let index = getIndex(topMenuLinks, e.target)
    let hasSubLink = menuLinks[index].subLinks
    
    
    if (isActive && hasSubLink) {
        subMenuEl.style.top = "100%"
        buildSubmenu(hasSubLink)
    } else {
        subMenuEl.style.top = "0%"
        mainEl.firstChild.textContent = e.target.textContent

    }


})

function getIndex(nodeList, target) {
    for ( let i in nodeList) {
        if (nodeList[i] === target)
        return i
    }
    return -1
}

function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = ""

    subLinks.forEach((link) => {
        let a = document.createElement("a")
        a.hasAttribute(`href`, link.href)
        a.textContent = link.text
        subMenuEl.appendChild(a)
    })
}

subMenuEl.addEventListener("click", (e) => {
    e.preventDefault()

    if (e.target.localName !== "a") {
        return
    }
    console.log(e.target);
    subMenuEl.style.top = "0"

    let topMenuTag = document.querySelector(".active")
    topMenuTag.classList.remove("active")
    
    mainEl.firstChild.textContent = e.target.textContent
    

})