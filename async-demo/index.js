// callbacks

console.log('before');
// getUser(1, (user) => {
//     getRepositories(user.name,(repos) => {
//         getCommits(repos[0],(commits) => {
//             console.log(commits);
//         });
//     });
// });

// getUser(1)
//     .then(user => getRepositories(user.name))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits)).catch(err => console.log(err.message));


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: 'Mosh'
            })

        }, 2000);
    })

}
function getRepositories() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github api repo');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);
    })
}
function getCommits() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github api commits');
            resolve(['commit'])
        }, 2000);
    })
}

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repo = await getRepositories(user.name);
        const commits = await getCommits(repo[0]);
        console.log(commits);
    } catch (error) {
        console.log(error);
    }
}

displayCommits();

console.log('after');




function countDown(time) {
    let intervalId = setInterval(() => {
        time--;
        if (time > 0) {
            console.log(time);
        } else {
            console.log('Ring Ring Ring!!!');
            clearInterval(intervalId);
        }
    }, 1000);
}

countDown(5);