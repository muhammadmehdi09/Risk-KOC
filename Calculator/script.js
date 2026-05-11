
const POINTS = {

    Knight: {
        participation: 10,
        modes: {
            "1v1": 25,
            "2v2": 25,
            "3v3": 25,
            "3pFFA": 37.5,
            "4pFFA": 50,
            "5pFFA": 62.5,
            "6pFFA": 75
        }
    },

    Baronet: {
        participation: 5,
        modes: {
            "1v1": 50,
            "2v2": 50,
            "3v3": 50,
            "3pFFA": 75,
            "4pFFA": 100,
            "5pFFA": 125,
            "6pFFA": 150
        }
    },

    Baron: {
        participation: 3,
        modes: {
            "1v1": 75,
            "2v2": 75,
            "3v3": 75,
            "3pFFA": 112.5,
            "4pFFA": 150,
            "5pFFA": 187.5,
            "6pFFA": 225
        }
    },

    Viscount: {
        participation: 0,
        modes: {
            "1v1": 100,
            "2v2": 100,
            "3v3": 100,
            "3pFFA": 150,
            "4pFFA": 200,
            "5pFFA": 250,
            "6pFFA": 300
        }
    },

    Count: {
        participation: -10,
        modes: {
            "1v1": 150,
            "2v2": 150,
            "3v3": 150,
            "3pFFA": 225,
            "4pFFA": 300,
            "5pFFA": 375,
            "6pFFA": 450
        }
    },

    Marquess: {
        participation: -100,
        modes: {
            "1v1": 250,
            "2v2": 250,
            "3v3": 250,
            "3pFFA": 375,
            "4pFFA": 500,
            "5pFFA": 625,
            "6pFFA": 750
        }
    },

    Duke: {
        participation: -250,
        modes: {
            "1v1": 500,
            "2v2": 500,
            "3v3": 500,
            "3pFFA": 750,
            "4pFFA": 1000,
            "5pFFA": 1250,
            "6pFFA": 1500
        }
    }
};

function calculatePoints() {

    const gamesPlayed =
        parseInt(document.getElementById("gamesPlayed").value) || 0;

    const gamesWon =
        parseInt(document.getElementById("gamesWon").value) || 0;

    const mode =
        document.getElementById("gameMode").value;

    const rank =
        document.getElementById("gameRank").value;

    const participation =
        POINTS[rank].participation;

    const winPoints =
        POINTS[rank].modes[mode];

    const total =
        (gamesPlayed * participation) +
        (gamesWon * winPoints);

    document.getElementById("result").textContent =
        total;
}