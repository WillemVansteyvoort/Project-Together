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
use Illuminate\Support\Facades\Mail;
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


Route::post('/posts', 'HomeController@create');

Route::get('/test', function () {
    return view('application.test');
});

/////********************** ONLY ADMIN ********************** /////
Route::group(['middleware' => ['auth', 'owner']], function () {
    Route::get('/company', 'CompanyController@index')->name('front_company');
    Route::get('/company/settings', 'CompanyController@settings')->name('front_settings');
    Route::post('/company/settings', 'CompanyController@update');
    Route::get('/welcome', 'CompanyController@welcome')->name('app_welcome');
});



/////********************** AUTHORIZATION ********************** /////
Route::get('/{company}/login', 'Auth\CompanyLoginController@index')->name('front.loginCompany');
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

});

/////********************** OTHER PAGES ********************** /////
Route::get('/user/verify/{token}/{id}', 'Application\VerifyUser@index')->name('front_verify');
Route::post('/user/verify/', 'Application\VerifyUser@verify');
Route::get('/{company}/password', 'Application\PasswordResetController@index')->name('front_reset');
Route::post('/password', 'Application\PasswordResetController@store');
Route::get('/password/{url}/{token}', 'Application\PasswordResetController@verifyPage');
Route::post('/password/change', 'Application\PasswordResetController@updatePassword');



//CLOSED API CALLS
Route::post('/api/user/create', 'Auth\RegisterCompanyController@create');
Route::post('/api/register/check', 'Auth\RegisterCompanyController@check');
Route::get('/api/industries', 'IndustryController@tojson');
Route::get('/api/countries', 'Application\AccountController@getCountries');

Route::group(['middleware' => ['auth']], function () {
Route::post('/api/user/activity', 'UpdateActivity@update');
Route::get('/api/menu/online', 'Application\Menucontroller@online');
Route::get('/api/menu/notifications', 'Application\Menucontroller@notifications');
Route::post('/api/menu/notifications', 'Application\Menucontroller@notificationsRead');
    Route::get('/api/menu/test', 'Application\Menucontroller@newNotification');

Route::get('/api/company/users', 'Application\companyController@users');
Route::get('/api/company/invites', 'Application\companyController@invites');
Route::get('/api/company/groups', 'Application\companyController@groups');

Route::get('/api/notifcations/today', 'Application\DashboardController@notifcationsToday');
Route::get('/api/notifcations/yesterday', 'Application\DashboardController@notificationsYesterday');
Route::get('/api/notifcations/older', 'Application\DashboardController@noticationsOlder');

//account
Route::post('/api/account/update/profile', 'Application\AccountController@updateProfile');
Route::post('/api/account/password/change', 'Application\AccountController@updatePassword');

//new user
Route::post('/api/check/email', 'Application\CreateUserController@checkEmail');
Route::post('/api/user/new', 'Application\CreateUserController@createUser');
});

//group
Route::post('/api/group/new', 'Application\CreateGroupController@create');

//two step authentication
Route::post('/api/twostep/change', 'Application\TwoStepController@change');


Route::get('/testdf', function () {
    $message = Nexmo::message()->send([
        'to' => '32489099902',
        'from' => '32474455182',
        'text' => 'Jo jonathan'
    ]);

});

Route::get('/home', 'HomeController@index')->name('home');


Route::post('/twostep', 'Application\TwoStepController@login');

