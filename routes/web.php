<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['lang']], function () {
    Route::get('/', function () {
        return view('front.index');
    })->name('front_home');

    Route::get('/about', function () {
        return view('front.about');
    })->name('front_about');

    Route::get('/support', function () {
        return view('front.support');
    })->name('front_support');


    Route::get('/blog', function () {
        return view('front.blog');
    })->name('front_blog');


    Route::get('/account', function () {
        return view('application.account');
    });

    Route::get('/options', function () {
        return view('front.options');
    })->name('front_options');;

    Route::get('/docs', function () {
        return view('front.docs');
    })->name('front_docs');;


    Route::post('/posts', 'HomeController@create');

    Route::get('/test', function () {
        return view('application.test');
    });

//lang
    Route::get('/', function () {
        return view('front.index');
    })->name('front_home');
    Route::get('/lang/{lang}', 'LangController@set')->name('lang_set');


/////********************** ONLY ADMIN ********************** /////
    Route::group(['middleware' => ['auth', 'owner']], function () {
        Route::get('/company', 'CompanyController@index')->name('front_company');
        Route::get('/company/settings', 'CompanyController@settings')->name('front_settings');
        Route::post('/company/settings', 'CompanyController@update');
        Route::post('/company/logo', 'CompanyController@deleteLogo');
        Route::get('/welcome', 'CompanyController@welcome')->name('app_welcome');
    });


/////********************** AUTHORIZATION ********************** /////
    Route::get('/{company}/login', 'Auth\CompanyLoginController@index')->name('front_loginCompany');

    Route::post('/company/login', 'Auth\CompanyLoginController@store');
    Route::get('/login', 'Auth\LoginController@index')->name('front_login');
    Route::post('/login', 'Auth\LoginController@store')->name('front_login');
    Route::get('/signup', 'Auth\RegisterController@index')->name('front_signup');


    Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider');
    Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');

/////********************** ONLY AUTHENTICATED ********************** /////
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/logout', 'Auth\LogoutController@index')->name('app_logout');
        Route::get('/no-access', function () {
            return view('front.no-access');
        });
    });

/////********************** RIGHT COMPANY & AUTHENTICATED ********************** /////
    Route::group(['middleware' => ['auth', 'company', 'verification']], function () {
        Route::get('/{company}/dashboard', 'Application\DashboardController@index')->name('app_dashboard');
        Route::get('/{company}/company', 'Application\CompanyController@index')->name('app_company');
        Route::get('/{company}/account', 'Application\AccountController@index')->name('app_account');
        Route::get('/{company}/calendar', 'Application\CalendarController@index')->name('app_calendar');
        Route::get('/{company}/projects', 'Application\ProjectController@index')->name('app_projects');
        Route::get('/{company}/project', function () {
            return view('application.project.index');
        });
        Route::get('/{company}/{user}/profile', 'Application\ProfileController@index')->name('app_profile');

    });
/////********************** RIGHT PROJECT & AUTHENTICATED ********************** /////
    Route::group(['middleware' => ['auth', 'company', 'verification', 'project']], function () {
        Route::get('/{company}/{project}/project/{path?}', [
            'uses' => 'Application\ProjectController@data',
            'where' => ['path' => '.*']
        ])->name('app_project');
        Route::get('/{company}/{project}/end/project/', 'Application\ProjectController@ended')->name('app_projectEnd');
        Route::post('/{company}/{project}/project', 'Application\ProjectController@reopen');

    });

/////********************** OTHER PAGES ********************** /////
/// //verification
    Route::get('/user/verify/{token}/{id}', 'Application\VerifyUser@index')->name('front_verify');
    Route::post('/user/verify/', 'Application\VerifyUser@verify');
//password reset
    Route::get('/{company}/password', 'Application\PasswordResetController@index')->name('front_reset');
    Route::post('/password', 'Application\PasswordResetController@store');
    Route::get('/password/{url}/{token}', 'Application\PasswordResetController@verifyPage');
    Route::post('/password/change', 'Application\PasswordResetController@updatePassword');
//invite
    Route::group(['middleware' => ['guest']], function () {
        Route::get('/{company}/invite/{token}', 'Application\InviteController@index');
        Route::post('/invite/verify', 'Application\InviteController@createUser');
    });

});
//CLOSED API CALLS
Route::post('/api/user/create', 'Auth\RegisterCompanyController@create');
Route::post('/api/register/check', 'Auth\RegisterCompanyController@check');
Route::get('/api/industries', 'IndustryController@tojson');
Route::get('/api/countries', 'Application\AccountController@getCountries');

Route::group(['middleware' => ['auth']], function () {
    Route::post('/api/user/welcome', 'Application\DashboardController@welcome');
    Route::post('/api/user/firstProject', 'Application\ProjectController@DoneFirstProject');
    Route::post('/api/user/activity', 'UpdateActivity@update');
Route::get('/api//user/logs', 'Application\AccountController@getLogs');
Route::get('/api/menu/online', 'Application\MenuController@online');
Route::get('/api/menu/notifications', 'Application\MenuController@notifications');
Route::post('/api/menu/notifications', 'Application\MenuController@notificationsRead');
Route::get('/api/menu/test', 'Application\MenuController@newNotification');
Route::get('/api/company/message', 'Application\DashboardController@message');

Route::get('/api/company/users', 'Application\CompanyController@users');
Route::get('/api/company/invites', 'Application\CompanyController@invites');
Route::get('/api/company/all', 'Application\CompanyController@allInOne');
Route::get('/api/company/invites', 'Application\CompanyController@invites');
Route::get('/api/company/groups', 'Application\CompanyController@groups');
Route::get('/api/company/stats', 'Application\CompanyController@stats');
Route::post('/api/company/settings/save', 'Application\CompanyController@saveSettings');

Route::get('/api/notifcations/today', 'Application\DashboardController@notifcationsToday');
Route::get('/api/notifcations/yesterday', 'Application\DashboardController@notificationsYesterday');
Route::get('/api/notifcations/older', 'Application\DashboardController@noticationsOlder');

Route::get('/api/activities/all', 'Application\ActivityController@all');

//account
Route::post('/api/account/update/profile', 'Application\AccountController@updateProfile');
Route::post('/api/account/password/change', 'Application\AccountController@updatePassword');
Route::post('/api/account/avatar/change', 'Application\AccountController@changeAvatar');
Route::post('/api/account/settings/change', 'Application\AccountController@updateSettings');
Route::get('/api/account/stats/', 'Application\AccountController@getStats');

//user
Route::post('/api/check/email', 'Application\UserController@checkEmail');
Route::post('/api/user/new', 'Application\UserController@createUser');
Route::post('/api/user/edit', 'Application\UserController@editUser');
Route::post('/api/user/delete', 'Application\UserController@deleteUser');

//invite
Route::post('/api/invite/new', 'Application\InviteController@createInvite');
Route::post('/api/invite/email', 'Application\InviteController@checkEmail');
Route::post('/api/invite/delete', 'Application\InviteController@deleteInvite');

//group
Route::post('/api/group/new', 'Application\CreateGroupController@create');
Route::post('/api/group/user/delete', 'Application\CreateGroupController@deleteGroupUser');

//two step authentication
Route::post('/api/twostep/change', 'Application\TwoStepController@change');
Route::post('api/twostep/sendVerify', 'Application\TwoStepController@sendVerify');
Route::post('api/twostep/verify', 'Application\TwoStepController@verify');
Route::post('api/twostep/updatePhone', 'Application\TwoStepController@updatePhone');

//calendar
Route::post('/api/calendar/new', 'Application\CalendarController@create');
Route::get('/api/calendar/today', 'Application\CalendarController@today');
Route::get('/api/calendar/tomorrow', 'Application\CalendarController@tomorrow');
Route::get('/api/calendar/receive', 'Application\CalendarController@receive');
Route::post('/api/calendar/day', 'Application\CalendarController@getDay');

//Projects
Route::post('/api/project/new', 'Application\ProjectController@create');
Route::post('/api/project/check/name', 'Application\ProjectController@checkName');
Route::post('/api/project/close', 'Application\ProjectController@close');
Route::post('/api/project/user/new', 'Application\ProjectController@addUser');
Route::post('/api/project/edit', 'Application\ProjectController@edit');
Route::get('/api/projects/all', 'Application\ProjectController@getProjects');
Route::post('/api/projects/users', 'Application\ProjectController@getUsers');

/////********************** PROJECT API ********************** /////

//overview
Route::post('/api/project/overview/info', 'Application\Project\OverviewController@getInfo');
Route::post('/api/project/overview/user/delete', 'Application\Project\OverviewController@deleteUser');
Route::post('/api/project/overview/user/edit', 'Application\Project\OverviewController@editUser');

//notes
Route::post('/api/project/notes/all', 'Application\Project\NoteController@getNotes');
Route::post('/api/project/notes/create', 'Application\Project\NoteController@create');
Route::post('/api/project/notes/delete', 'Application\Project\NoteController@delete');

//forum
Route::post('/api/project/forum/replies', 'Application\Project\ForumController@getReplies');
Route::post('/api/project/forum/tags', 'Application\Project\ForumController@getTags');
Route::post('/api/project/forum/createPost', 'Application\Project\ForumController@createPost');
Route::post('/api/project/forum/post', 'Application\Project\ForumController@getPost');
Route::post('/api/project/forum/createReply', 'Application\Project\ForumController@createReply');
Route::post('/api/project/forum/editReply', 'Application\Project\ForumController@editReply');
Route::post('/api/project/forum/deleteReply', 'Application\Project\ForumController@deleteReply');
Route::post('/api/project/forum/editFirst', 'Application\Project\ForumController@editFirst');
Route::post('/api/project/forum/deleteFirst', 'Application\Project\ForumController@deleteFirst');

//board
Route::post('/api/project/board/items', 'Application\Project\BoardController@getItems');
Route::post('/api/project/board/columns', 'Application\Project\BoardController@getColumns');
Route::post('/api/project/board/changeColumn', 'Application\Project\BoardController@changeColumn');
Route::post('/api/project/board/createItem', 'Application\Project\BoardController@createItem');
Route::post('/api/project/board/editItem', 'Application\Project\BoardController@editItem');
Route::post('/api/project/board/deleteItem', 'Application\Project\BoardController@deleteItem');

//crisiscenter
Route::post('/api/project/crisiscenter/items', 'Application\Project\CrisisCenterController@getItems');
Route::post('/api/project/crisiscenter/create', 'Application\Project\CrisisCenterController@create');
Route::post('/api/project/crisiscenter/solved', 'Application\Project\CrisisCenterController@setSolved');
Route::post('/api/project/crisiscenter/progress', 'Application\Project\CrisisCenterController@setProgress');
Route::post('/api/project/crisiscenter/delete', 'Application\Project\CrisisCenterController@deleteItem');
Route::post('/api/project/crisiscenter/edit', 'Application\Project\CrisisCenterController@editItem');
Route::post('/api/project/crisiscenter/widget', 'Application\Project\CrisisCenterController@getWidget');

//logs
Route::post('/api/project/logs/items', 'Application\Project\LogController@getitems');
Route::post('/api/project/logs/create', 'Application\Project\LogController@create');
Route::post('/api/project/logs/edit', 'Application\Project\LogController@edit');
Route::post('/api/project/logs/delete', 'Application\Project\LogController@delete');

//polls
Route::post('/api/project/polls/items', 'Application\Project\PollController@getitems');
Route::post('/api/project/polls/vote', 'Application\Project\PollController@vote');
Route::post('/api/project/polls/create', 'Application\Project\PollController@create');
Route::post('/api/project/polls/delete', 'Application\Project\PollController@delete');
Route::post('/api/project/polls/edit', 'Application\Project\PollController@editPoll');
Route::post('/api/project/polls/deletePoll', 'Application\Project\PollController@deletePoll');

//tasks
Route::post('/api/project/tasks/lists', 'Application\Project\TaskController@getLists');
Route::post('/api/project/tasks/done', 'Application\Project\TaskController@asDone');
Route::post('/api/project/tasks/timer', 'Application\Project\TaskController@addTimer');
Route::post('/api/project/tasks/users', 'Application\Project\TaskController@getProjectUsers');
Route::post('/api/project/tasks/create', 'Application\Project\TaskController@createTask');
Route::post('/api/project/tasks/delete', 'Application\Project\TaskController@deleteTask');
Route::post('/api/project/tasks/edit', 'Application\Project\TaskController@editTask');
Route::post('/api/project/tasks/list/create', 'Application\Project\TaskController@createList');
Route::post('/api/project/overview/tasks/get', 'Application\Project\TaskController@getModule');
Route::get('/api/project/overview/tasks/widget', 'Application\Project\TaskController@widget');

Route::post('/twostep', 'Application\TwoStepController@login');

});