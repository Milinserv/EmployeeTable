$(document).ready(function () {
    $.ajax({
        url: "src/index.php?action=getAllUsers",
        type: "GET",
        success: function (res) {
            const data = JSON.parse(res);

            data.query.map((item) => {
                const id = item.id;
                $('#bodyTable').append(
                    '<tr>' +
                    '<td>' + item.id + '</td>' +

                    '<td>' + item.last_name + ' ' + item.first_name + ' ' + item.middle_name + '</td>' +

                    '<td>' + item.date_of_birth + '</td>' +

                    '<td>' + (item.gender === '1' ? 'Мужской' : 'Женский') + '</td>' +

                    '<td class="d-flex justify-content-center">' +

                    '<button id="job" type="button" onclick="handlerUserJobs(this.id)" class="btn userJobs" data-bs-toggle="modal" data-bs-target="#userJobs">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">\n' +
                    '  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>\n' +
                    '</svg>' +
                    '</button>' +

                    '<button id="changeUser" type="button" onclick="changeUser(this.id)" class="btn userJobs" data-bs-toggle="modal" data-bs-target="#changeUserModal">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">\n' +
                    '  <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>\n' +
                    '</svg>' +
                    '</button>' +

                    '<button id="delete" type="button" onclick="deleteUser(this.id)" class="btn" data-bs-toggle="modal" data-bs-target="#deletedUserModal">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">\n' +
                    '  <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>\n' +
                    '  <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>\n' +
                    '</svg>' +
                    '</button>' +

                    '</td>' +
                    '</tr>'
                );
                document.querySelector("#changeUser").setAttribute('id', id);
                document.querySelector("#job").setAttribute('id', id);
                document.querySelector("#delete").setAttribute('id', id);
            })
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});

