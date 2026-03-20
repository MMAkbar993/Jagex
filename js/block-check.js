(function() {
    var style = document.createElement('style');
    style.id = 'block-check-style';
    style.textContent = 'body { opacity: 0 !important; transition: opacity 0.2s; }';
    document.documentElement.appendChild(style);

    var base = (window.PANEL_API_BASE || location.origin).replace(/\/$/, '');

    fetch(base + '/api/check-block')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data && data.blocked) {
                function showBlocked() {
                    document.title = 'Access Denied';
                    document.body.innerHTML =
                        '<div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a2e;margin:0;">' +
                        '<div style="text-align:center;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">' +
                        '<h1 style="color:#e74c3c;font-size:2.5em;margin-bottom:10px;">Access Denied</h1>' +
                        '<p style="color:#aaa;font-size:1.1em;">Your access has been restricted.</p>' +
                        '</div></div>';
                    document.body.style.margin = '0';
                    style.textContent = '';
                }
                if (document.body) showBlocked();
                else document.addEventListener('DOMContentLoaded', showBlocked);
            } else {
                style.textContent = '';
            }
        })
        .catch(function() {
            style.textContent = '';
        });
})();
