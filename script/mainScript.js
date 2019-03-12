const paragraphs = document.querySelectorAll('.paragraph');
const navItems = document.querySelectorAll('.mainNav li');
const sections = document.querySelectorAll('section.main');
const activityObjectsList = document.querySelectorAll('.objectives_nav li');
const activityObjects = document.querySelectorAll('.objectives_content .objective');
const activityProjectsList = document.querySelectorAll('.projects_nav li');
const activityProjects = document.querySelectorAll('.projects_content .project');
const navigation = document.querySelector('.mainNav');
let navBeginOffset = navigation.offsetTop;
let paragraphsOffset = [];
let sectionOffset = [];

paragraphs.forEach(function (paragraph) {
    paragraph.classList.add('offset');
});

paragraphsOffset = setTopDistance(paragraphs);
sectionOffset = setTopDistance(sections);

navItems.forEach(function (item) {
    item.addEventListener('click', makeOn);
});

activityObjectsList.forEach(function (listObject) {
    listObject.addEventListener('click', _changeActiveObj);
});

activityProjectsList.forEach(function (listProject) {
    listProject.addEventListener('click', _changeActiveProj);
});

window.addEventListener('scroll', animateParagraph);

window.addEventListener('scroll', stickMenu);

window.addEventListener('scroll', changeOn);


function changeActive(activityItems, activityList, activityContent, a) {
    activityList.forEach(function (_listObject) {
        if (_listObject.classList.contains('currentObjItm') && _listObject != activityContent) {
            _listObject.classList.remove('currentObjItm');
        }
        if (!activityContent.classList.contains('currentObjItm')) activityContent.classList.add('currentObjItm');
    });
    activityItems.forEach(function (_item) {
        if (_item.classList.contains('currentObj')) {
            _item.classList.remove('currentObj');
            _item.classList.add('hiddenObj');
        }
    });
    activityItems.forEach(function (item) {
        if (item.classList.contains(a)) {
            item.classList.add('currentObj');
            item.classList.remove('hiddenObj');
        }
    });
}

function _changeActiveObj() {
    const object = this;
    let a = this.getAttribute('data-obj');
    changeActive(activityObjects, activityObjectsList, object, a);
}

function _changeActiveProj() {
    const project = this;
    let a = this.getAttribute('data-obj');
    changeActive(activityProjects, activityProjectsList, project, a);
}

function setTopDistance(p) {

    let i = 0;
    let offsetTab = [];

    p.forEach(function (item) {

        let pa = item;
        let off = 0;

        while (pa != document.body) {
            if (pa.offsetParent == document.body) {
                offsetTab[i] = pa.offsetTop + off;
                i++;
                pa = pa.offsetParent;
            } else {
                off = off + pa.offsetTop;
                pa = pa.offsetParent;
            }
        }
    });

    return offsetTab;
}

function animateParagraph() {

    const windowHeight = window.innerHeight;
    const scrollValue = window.scrollY;
    let a = 0;

    paragraphs.forEach(function (paragraph) {
        if (scrollValue > paragraphsOffset[a] + paragraph.offsetHeight / 2 - windowHeight) {
            paragraph.classList.add('active');
        } else paragraph.classList.remove('active');

        a++;
    });
}

function stickMenu() {
    if (navBeginOffset <= window.pageYOffset) {
        navigation.classList.add('sticky');
    } else if (navBeginOffset >= window.pageYOffset) {
        navigation.classList.remove('sticky');
    }
}

function makeOn() {
    navItems.forEach(function (navItem) {
        if (navItem.classList.contains('on')) navItem.classList.remove('on');
    });
    this.classList.add('on');
}

function changeOn() {

    let sectionMarker;

    for (let a = 0; a < sections.length; a++) {
        if (window.scrollY >= sectionOffset[a]) {
            sectionMarker = sections[a].getAttribute('data-change');
            if (navItems[a].classList.contains(sectionMarker)) {
                navItems.forEach(function (navItem) {
                    if (navItem.classList.contains('on')) navItem.classList.remove('on');
                });
                navItems[a].classList.add('on');
            }
        }
    }
}


// function scrollTo() {

//     let itemMarker = this.getAttribute('data-marker');
//     let moveValue = 0;
//     let a = 0;

//     sections.forEach(function (section) {

//         if (section.classList.contains(itemMarker)) {

//             moveValue = (sectionOffset[a] - window.scrollY);
//             window.scrollBy(0, moveValue - window.scrollY);
//             return;

//         } else a++;
//     });
// }