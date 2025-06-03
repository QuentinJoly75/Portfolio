document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href') || this.classList.contains('active') ||
                this.getAttribute('href').startsWith('http')) {
                return;
            }

            e.preventDefault();
            const page = this.getAttribute('href');
            if (!page) return;

            fetch(page)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Mettre à jour le contenu principal
                    document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;

                    // Mettre à jour le titre
                    document.title = doc.title;

                    // NOUVEAU: Mettre à jour les feuilles de style
                    const newStylesheets = Array.from(doc.querySelectorAll('head link[rel="stylesheet"]'));
                    const currentStylesheets = Array.from(document.querySelectorAll('head link[rel="stylesheet"]'));

                    // Supprimer les styles qui ne sont pas dans la nouvelle page
                    currentStylesheets.forEach(currentLink => {
                        const href = currentLink.getAttribute('href');
                        if (!newStylesheets.some(newLink => newLink.getAttribute('href') === href)) {
                            currentLink.remove();
                        }
                    });

                    // Ajouter les nouveaux styles
                    newStylesheets.forEach(newLink => {
                        const href = newLink.getAttribute('href');
                        if (!currentStylesheets.some(currentLink => currentLink.getAttribute('href') === href)) {
                            document.head.appendChild(newLink.cloneNode(true));
                        }
                    });

                    history.pushState({}, '', page);

                    // Mettre à jour les classes active
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                })
                .catch(err => console.error('Erreur lors du chargement de la page:', err));
        });
    });

    window.addEventListener('popstate', function() {
        location.reload();
    });
});