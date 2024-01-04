/**
 * @param {Date} endDate
 */
export default function (endDate) {
  const countdownCallback = setInterval(function () {
    const now = new Date();
    const distance = endDate.getTime() - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance >= 0) {
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;
    } else {
      clearInterval(countdownCallback);

      const isSameDate = now.toDateString() === endDate.toDateString();

      document.getElementById("countdown").style.display = "none";
      document.getElementById("wedding-running").style.display = isSameDate
        ? "block"
        : "none";
      document.getElementById("wedding-done").style.display = isSameDate
        ? "none"
        : "block";
    }
  }, 1000);
}
