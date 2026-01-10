
export const getOjectById = (data, id) => {
    return data?.find(e => e.id == id) ? data?.find(e => e.id == id) : "unknown";
}

export const filterById = (data, id, title) => {
    return data.filter(e => e[title] == id) || []
}

export const getMoviesWithUpcomingShowtimes = (movies, movieScreen) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const next7Days = new Date(now);
    next7Days.setDate(now.getDate() + 7);

    const movieIds = new Set(
        movieScreen
            .filter(st => {
                const showDate = new Date(st.release_date);
                showDate.setHours(0, 0, 0, 0);
                return showDate >= now && showDate <= next7Days;
            })
            .map(st => st.idMovie)
    );

    return movies.filter(movie => movieIds.has(movie.id));
}


export const getMoviesWithShowtimesAfter7Days = (movies, movieScreen) => {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    const movieIds = new Set(
        movieScreen
            .filter(st => {
                const showDate = new Date(st.release_date);
                return showDate > next7Days;
            })
            .map(st => st.idMovie)
    );

    return movies.filter(movie => movieIds.has(movie.id));
};


export const getShowDatesOfMovieWithin7Days = (idMovie, movieScreen) => {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    // Lọc đúng lịch chiếu của bộ phim này trong 7 ngày tới
    const dates = movieScreen
        .filter(st => st.idMovie === idMovie)
        .filter(st => {
            const showDate = new Date(st.release_date);
            console.log(showDate, now);
            return showDate >= now;
        })
    console.log(dates);

    // Xóa trùng + sắp xếp
    const uniqueSortedDates = Array.from(new Set(dates))
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    return uniqueSortedDates;
};

export function getNext7Days() {
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const result = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        result.push({
            date: `${year}-${month}-${day}`,
            day: daysOfWeek[d.getDay()]
        });
    }

    return result;
}
