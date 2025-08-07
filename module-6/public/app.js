document.addEventListener('DOMContentLoaded', () => {
  const awardBtn = document.getElementById('award-btn');
  const checkBtn = document.getElementById('check-btn');
  const outputElement = document.getElementById('output');

  checkBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/check-credits');
      const data = await res.json();
      outputElement.innerText = JSON.stringify(data, null, 2);
    } catch (err) {
      outputElement.innerText = 'Failed to check credits.';
    }
  });

  awardBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/award-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: "user-001",
          actionType: "award",
          spend: 500,
          referrerId: "ref-xyz"
        })
      });
      const data = await res.json();
      outputElement.innerText = JSON.stringify(data, null, 2);
    } catch (err) {
      outputElement.innerText = 'Failed to award credits.';
    }
  });
});
