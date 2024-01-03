(function () {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let dayMonth = "07/02/";
    let birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;

    //end

    const countDown = new Date(birthday).getTime();
    const x = setInterval(function () {
        const now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / day);
        document.getElementById("hours").innerText = Math.floor(
            (distance % day) / hour
        );
        document.getElementById("minutes").innerText = Math.floor(
            (distance % hour) / minute
        );
        document.getElementById("seconds").innerText = Math.floor(
            (distance % minute) / second
        );

        //do something later when date is reached
        if (distance < 0) {
            document.getElementById("countdown").style.display = "none";
            document.getElementById("wedding-running").style.display = "block";
            document.getElementById("wedding-done").style.display = "block";

            clearInterval(x);
        }
        //seconds

        const GivenDates = "07/02/2024";

        let GivenDate = "2023-02-07";
        const CurrentDate = new Date();

        GivenDate = new Date(GivenDate);

        if (GivenDate > CurrentDate) {
            if (GivenDates == today) {
                document.getElementById("countdown").style.display = "none";
                document.getElementById("wedding-running").style.display =
                    "block";
                document.getElementById("wedding-done").style.display = "none";

                clearInterval(x);
            } else {
                document.getElementById("countdown").style.display = "none";
                document.getElementById("wedding-running").style.display =
                    "none";
                document.getElementById("wedding-done").style.display = "block";

                clearInterval(x);
            }
        }
    }, 0);
})();
