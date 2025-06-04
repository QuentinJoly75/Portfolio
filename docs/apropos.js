/**
 * Animation pour les sections de la page À propos
 * Ce script permet d'animer les sections au défilement de la page
 * et d'initialiser les cercles de compétences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');

    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Fonction pour ajouter la classe visible aux éléments visibles
    function checkVisibility() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');

                // Si c'est la section des compétences, initialiser les cercles
                if (element.querySelector('.skills-grid')) {
                    initSkillCircles();
                }
            }
        });
    }

    // Vérifie la visibilité au chargement de la page
    checkVisibility();

    // Vérifie la visibilité lors du défilement
    window.addEventListener('scroll', checkVisibility);

    // Rendre les éléments de la timeline immédiatement visibles
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
        // Supprimer la classe fade-in pour éviter la disparition
        item.classList.remove('fade-in');
    });

    // Animation des cercles de compétences
    function initSkillCircles() {
        const circles = document.querySelectorAll('.skill-circle:not(.animated)');

        circles.forEach(circle => {
            const bar = circle.querySelector('.circle-bar');
            const percent = parseInt(circle.getAttribute('data-percentage'), 10);
            const radius = 56;
            const circumference = 2 * Math.PI * radius;

            bar.style.strokeDasharray = `${circumference}`;
            bar.style.strokeDashoffset = `${circumference}`;

            setTimeout(() => {
                const dashoffset = circumference * (1 - percent / 100);
                bar.style.strokeDashoffset = dashoffset;
                circle.classList.add('animated'); // Marquer comme déjà animé
            }, 500);
        });
    }

    // Initialiser les cercles au chargement de la page
    initSkillCircles();
});
