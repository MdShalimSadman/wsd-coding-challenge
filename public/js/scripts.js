document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.querySelector('textarea').value;

        try {
            const response = await fetch('/api/texts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const result = await response.json();
            window.location.href = `/result?id=${result.id}`;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
