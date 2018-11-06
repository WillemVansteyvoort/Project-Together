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
    Route::get('/welcome', 'Application\WelcomeController@index')->name('app_welcome');
});

/////********************** RIGHT COMPANY & AUTHENTICATED ********************** /////
Route::group(['middleware' => ['auth', 'company']], function () {
    Route::get('/{company}/dashboard', 'Application\DashboardController@index')->name('app_dashboard');
    Route::get('/{company}/company', 'Application\CompanyController@index')->name('app_company');

});





//CLOSED API CALLS
Route::post('/api/user/create', 'Auth\RegisterCompanyController@create');
Route::post('/api/register/check', 'Auth\RegisterCompanyController@check');
Route::get('/api/industries', 'IndustryController@tojson');

Route::group(['middleware' => ['auth']], function () {
Route::post('/api/user/activity', 'UpdateActivity@update');
Route::get('/api/menu/online', 'Application\Menucontroller@online');
Route::get('/api/menu/notifications', 'Application\Menucontroller@notifications');
Route::post('/api/menu/notifications', 'Application\Menucontroller@notificationsRead');

Route::get('/api/company/users', 'Application\companyController@users');
Route::get('/api/company/invites', 'Application\companyController@invites');
Route::get('/api/company/groups', 'Application\companyController@groups');


});








Route::get('/mail', function () {

    $data = [
        'name' => 'Willem Vansteyvoort',
        'company' => 'Chiro Jongens Kalfort'
    ];

    Mail::send('mails.welcome', $data, function($message) {

        $message->to('willemvansteyvoort@gmail.com', 'willem vansteyvoort')->subject('Welcome to Project-Together');

    });


});