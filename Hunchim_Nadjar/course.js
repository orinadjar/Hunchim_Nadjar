document.addEventListener('DOMContentLoaded', () => {
    const courseId = localStorage.getItem('currentCourseId');
    if (courseId) {
        loadCourseContent(courseId);
    } else {
        // אם אין מזהה קורס, חזרה לדף הראשי
        window.location.href = 'index.html';
    }
});

function loadCourseContent(courseId) {
    const courseContent = document.getElementById('course-content');
    
    if (courseId === 'tcb-a3') {
        courseContent.innerHTML = `
            <div class="course-content">
                <h2 class="course-title">מבוא לפייתון וקריפטוגרפיה</h2>
                <p> קורס זה מספק מבוא לתכנות בשפת פייתון ויסודות הקריפטוגרפיה.</p>
                <p>אין על מיכאל פינקל האלוף</p>
                
                <div class="assignments-section">
                    <h3 class="assignments-title">עבודות הגשה</h3>
                    <ul class="assignment-list">
                        <li class="assignment-item">
                            <h4 class="assignment-name">עבודת הגשה 1: מבוא לפייתון</h4>
                            <p class="assignment-description">תרגילים בסיסיים בפייתון</p>
                            <a href="HW_Python/HW1.pdf" class="assignment-link" download>הורד את קובץ העבודה</a>
                        </li>
                        <li class="assignment-item">
                            <h4 class="assignment-name">עבודת הגשה 2: יסודות הקריפטוגרפיה</h4>
                            <p class="assignment-description">יישום אלגוריתמים קריפטוגרפיים בסיסיים</p>
                            <a href="HW_Python/HW2 (2).pdf" class="assignment-link" download>הורד את קובץ העבודה</a>
                        </li>
                        <li class="assignment-item">
                            <h4 class="assignment-name">עבודת הגשה 3: מתקדם בפייתון</h4>
                            <p class="assignment-description">תרגילים מתקדמים בפייתון</p>
                            <a href="HW_Python/HW3 (4).pdf" class="assignment-link" download>הורד את קובץ העבודה</a>
                        </li>
                        <li class="assignment-item">
                            <h4 class="assignment-name">עבודת הגשה 4: קריפטוגרפיה מתקדמת</h4>
                            <p class="assignment-description">יישום אלגוריתמים קריפטוגרפיים מתקדמים</p>
                            <a href="HW_Python/HW4 (5).pdf" class="assignment-link" download>הורד את קובץ העבודה</a>
                        </li>
                    </ul>
                </div>
                
                <a href="index.html" class="back-button">חזרה לדף הראשי</a>
            </div>
        `;
    } else {
        courseContent.innerHTML = `
            <div class="course-content">
                <h2 class="course-title">קורס ${courseId}</h2>
                <p>כאן יופיע תוכן הקורס בעתיד.</p>
                <a href="index.html" class="back-button">חזרה לדף הראשי</a>
            </div>
        `;
    }
}