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

Route::get('/aanmelden', function () {
    return view('front.login');
})->name('front_login');

Route::get('/signup', function () {
    return view('front.register');
})->name('front_signup');


Route::get('/dashboard', function () {
    return view('application.dashboard');
})->name('app_dashboard');




Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');