const courses = {
    'tcb': {
        'semester-a': [
            { id: 'tcb-a1', title: 'Full stack - client' },
            { id: 'tcb-a2', title: 'מבוא למחשבים' },
            { id: 'tcb-a3', title: 'מבוא לפייתון וקריפטוגרפיה' },
            { id: 'tcb-a4', title: 'תקשורת נתונים ואבטחת מידע' },
        ],
        'semester-b': [
            { id: 'tcb-b1', title: 'Full Stack - server' },
            { id: 'tcb-b2', title: 'מבוא לפייתון וקריפטוגרפיה 2' },
            { id: 'tcb-b3', title: 'מערכת הפעלה ולינוקס' },
            { id: 'tcb-b4', title: 'תכנות ב-Java' },
            { id: 'tcb-b5', title: 'תקשורת נתונים ואבטחת מידע 2' },
        ],
        'semester-c': [
            { id: 'tcb-c1', title: 'תכנות ויזואל Windows Application' },
        ],
    },
    'sce': {
        'semester-a': [
            { id: 'sce-a1', title: 'לוגיקה' },
            { id: 'sce-a2', title: 'שפת C' },
        ],
        'semester-b': [
            { id: 'sce-b1', title: 'לינארית' },
            { id: 'sce-b2', title: 'תכנות מונחה עצמים CPP' },
        ],
        'semester-c': [
            { id: 'sce-c1', title: 'חדוא 1' },
        ],
    }
};

function createHomePage() {
    const homePage = document.createElement('div');
    homePage.className = 'home-page';
    homePage.innerHTML = `
        <h2>ברוכים הבאים!</h2>
        <p>היי! אני אורי נדג'ר, סטודנט שנה ב'. הכנתי לכם אתר עם כל החומר של שנה א' ככה שאתם יותר ממסודרים <span class="emoji">😊</span></p>
        <p>יש פה הכל מהרצאות עד למבחנים ועבודות הגשה.</p>
        <p>תהנו!</p>
    `;
    return homePage;
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-icon"></div>
        <div class="course-title">${course.title}</div>
    `;
    card.addEventListener('click', () => openCourse(course.id));
    return card;
}

function renderCourses(institution, semesterId) {
    const grid = document.getElementById('courses-grid');
    grid.innerHTML = ''; // Clear existing content
    if (semesterId === 'home') {
        grid.appendChild(createHomePage());
    } else if (semesterId === 'all') {
        Object.keys(courses[institution]).forEach(semester => {
            const sectionDivider = document.createElement('div');
            sectionDivider.className = 'section-divider';
            sectionDivider.setAttribute('data-text', `סמסטר ${semester.slice(-1)}`);
            grid.appendChild(sectionDivider);

            const semesterSection = document.createElement('div');
            semesterSection.className = 'semester-section';
            courses[institution][semester].forEach(course => {
                semesterSection.appendChild(createCourseCard(course));
            });
            grid.appendChild(semesterSection);
        });
    } else if (courses[institution][semesterId]) {
        const sectionDivider = document.createElement('div');
        sectionDivider.className = 'section-divider';
        sectionDivider.setAttribute('data-text', `סמסטר ${semesterId.slice(-1)}`);
        grid.appendChild(sectionDivider);

        const semesterSection = document.createElement('div');
        semesterSection.className = 'semester-section';
        courses[institution][semesterId].forEach(course => {
            semesterSection.appendChild(createCourseCard(course));
        });
        grid.appendChild(semesterSection);
    }
}

function openCourse(courseId) {
    // שמירת מזהה הקורס ב-localStorage
    localStorage.setItem('currentCourseId', courseId);
    // מעבר לדף הקורס
    window.location.href = 'course.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses('tcb', 'home'); // Show home page by default

    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const tcbDropdown = document.querySelector('.dropdown.tcb');
    const sceDropdown = document.querySelector('.dropdown.sce');
    const semesterLinks = document.querySelectorAll('.submenu a');
    const homeLink = document.getElementById('home-link');
    const allCoursesLink = document.getElementById('all-courses');

    // עדכון התנהגות ה-dropdown עבור TCB ו-SCE
    [tcbDropdown, sceDropdown].forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                const submenu = dropdown.querySelector('.submenu');
                submenu.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                const submenu = dropdown.querySelector('.submenu');
                submenu.style.display = 'none';
            }
        });
    });

    semesterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const institution = e.target.closest('.dropdown').classList.contains('tcb') ? 'tcb' : 'sce';
            const semesterId = e.target.id.split('-')[2]; // Extract 'a' from 'tcb-semester-a'
            renderCourses(institution, 'semester-' + semesterId);
            mainMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderCourses('tcb', 'home');
        mainMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    allCoursesLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderCourses('tcb', 'all');
        mainMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // הוסף פונקציונליות לחיצה לכותרת
    const headerTitle = document.querySelector('header h1');
    headerTitle.addEventListener('click', (e) => {
        e.preventDefault();
        renderCourses('tcb', 'home');
        mainMenu.classList.remove('active');
        tcbDropdown.classList.remove('active');
        sceDropdown.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // סגירת התפריט בלחיצה מחוץ לו
    document.addEventListener('click', (e) => {
        if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mainMenu.classList.remove('active');
            tcbDropdown.classList.remove('active');
            sceDropdown.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // הוסף אנימציה לפריטי התפריט
    const menuItems = document.querySelectorAll('.main-menu li');
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.1 * index}s`;
    });
});