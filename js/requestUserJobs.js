function handlerUserJobs(userId) {
    $("#modal-title").html('Предыдущие места работы');
    const bodyJobs = $('#bodyJobs');
    const buttonCreate = $('#buttonCreate');
    buttonCreate.empty();
    bodyJobs.empty();
    buttonCreate.append('<button id="addUserJobs" type="button" onclick="formCreateUserJob(' + userId + ')" class="btn btn-primary">Создать</button>')

    $.ajax({
        url: "src/index.php?action=getJobsUser",
        type: "POST",
        data: {
            'id': userId
        },
        success: function (res) {
            const data = JSON.parse(res);
            data.state === 'success'
                ? data.query.map((item) => {
                    const id = item.id;
                    bodyJobs.append(
                        '<div class="row pb-1">' +
                        '<div class="col-1">' + item.id + '</div>' +
                        '<div class="col-8">Организации: ' + item.organization_name + '</div>' +
                        '<div class="col-6">Начала работы: ' + item.start_date + '</div>' +
                        '<div class="col-6">Конец работы: ' + item.end_date + '</div>' +
                        '</div>' +
                        '<div class="d-flex justify-content-end">' +
                        '<button id="change" class="btn mb-3 border border-1" onclick="formUpsertUserJob(this.id)">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">\n' +
                        '  <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>\n' +
                        '</svg>' +
                        '</button>' +
                        '<button id="delete" class="btn mb-3 border border-1" onclick="deleteJob(this.id)">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">\n' +
                        '  <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>\n' +
                        '  <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>\n' +
                        '</svg>' +
                        '</button>' +
                        '</div>' +
                        '<div id="stateDeleteJob"></div>'
                    );
                    document.querySelector("#change").setAttribute('id', id);
                    document.querySelector("#delete").setAttribute('id', id);
                })
                : bodyJobs.append('<h5>Пусто</h5>')
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    })
}

function formCreateUserJob(id) {
    const bodyJobs = $('#bodyJobs');
    const buttonCreate = $('#buttonCreate');
    bodyJobs.empty();
    buttonCreate.empty();

    $("#modal-title").html('Создать место работы');

    bodyJobs.append(
        '<div class="row pb-1">' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" id="organization_name" name="organization_name" placeholder="Организации" required/>' +
        '</div>' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" type="date" id="start_date" name="start_date" placeholder="Начала работы" required/>' +
        '</div>' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" type="date" id="end_date" name="end_date" placeholder="Конец работы" required/>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-end">' +
        '<button id="changeButton" class="btn btn-primary mb-3 border border-1" onclick="createJob(' + id + ')">Сахранить</button></div>' +
        '<div id="stateUpsertJob" class=""></div>'
    );
}

function formUpsertUserJob(id) {
    const bodyJobs = $('#bodyJobs');
    const buttonCreate = $('#buttonCreate');
    bodyJobs.empty();
    buttonCreate.empty();

    $("#modal-title").html('Изменить место работы');

    bodyJobs.append(
        '<div class="row pb-1">' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" id="organization_name" name="organization_name" placeholder="Организации" required/>' +
        '</div>' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" type="date" id="start_date" name="start_date" placeholder="Начала работы" required/>' +
        '</div>' +
        '<div class="form-group pb-1">' +
        '<input class="form-control" type="date" id="end_date" name="end_date" placeholder="Конец работы" required/>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-end">' +
        '<button id="changeButton" class="btn btn-primary mb-3 border border-1" onclick="upsertJob(' + id + ')">Сахранить</button></div>' +
        '<div id="stateUpsertJob" class=""></div>'
    );
}

function createJob(id) {
    const data = {
        'user_id': id,
        'organization_name': $('#organization_name').val(),
        'start_date': $('#start_date').val(),
        'end_date': $('#end_date').val()
    };
    const stateUpsertJob = $('#stateUpsertJob');
    stateUpsertJob.empty();
    $.ajax({
        url: "src/index.php?action=createJob",
        type: "POST",
        data: {
            'job': data
        },
        success: function (res) {
            const data = JSON.parse(res);
            data.state === 'success'
                ? stateUpsertJob.append('<h5 class="text-success">Место работы успешно создано!</h5>')
                : stateUpsertJob.append('<h5 class="text-danger">Ошибка создания место работы</h5>')
            data.state === 'success' && setTimeout(function () {
                location.reload();
            }, 2000);
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    })
}

function upsertJob(id) {
    const data = {
        'id': id,
        'organization_name': $('#organization_name').val(),
        'start_date': $('#start_date').val(),
        'end_date': $('#end_date').val()
    };
    const stateUpsertJob = $('#stateUpsertJob');
    stateUpsertJob.empty();
    $.ajax({
        url: "src/index.php?action=upsertJob",
        type: "POST",
        data: {
            'job': data
        },
        success: function (res) {
            const data = JSON.parse(res);
            data.state === 'success'
                ? stateUpsertJob.append('<h5 class="text-success">Место работы успешно изменено!</h5>')
                : stateUpsertJob.append('<h5 class="text-danger">Ошибка изменения место работы</h5>')
            data.state === 'success' && setTimeout(function () {
                location.reload();
            }, 2000);
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    })
}

function deleteJob(id) {
    const stateDeleteJob = $('#stateDeleteJob');
    $.ajax({
        url: "src/index.php?action=deleteJob",
        type: "POST",
        data: {
            'jobId': id
        },
        success: function (res) {
            const data = JSON.parse(res);
            data.state === 'success'
                ? stateDeleteJob.append('<h5 class="text-success">Место работы успешно удалено!</h5>')
                : stateDeleteJob.append('<h5 class="text-danger">Ошибка удаления место работы</h5>')
            data.state === 'success' && setTimeout(function () {
                location.reload();
            }, 2000);
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    })
}
