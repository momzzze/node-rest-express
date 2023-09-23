// callbacks

console.log('before');
// getUser(1, (user) => {
//     getRepositories(user.name,(repos) => {
//         getCommits(repos[0],(commits) => {
//             console.log(commits);
//         });
//     });
// });

getUser(1)
.then(user=>getRepositories(user.name))
.then(repos=>getCommits(repos[0]))
.then(commits=>console.log(commits)).catch(err=>console.log(err.message));

console.log('after');

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
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('calling github api repo');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);
    })   
}
function getCommits() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('calling github api commits');
            resolve(['commit'])
        }, 2000);
    })   
}
// promises


// const p = new Promise((resolve, reject) => {
//     // resolve(1);
//     reject(2);
// });
// console.log('before');
// p.then(result => console.log('result', result)).catch(e => console.log(e));
// console.log('after');