@extends('application.layouts.app')
@section('title', '- Calendar')
@section('content')
    <section class="header-banner">
        <div class="header-banner--text">
            <h2 class="float-left"> {{{ Auth::user()->company->name }}}</h2>
            <form class="float-right">
                <a class="button button-primary float-right"><i class="fas fa-search"></i> </a>
                <input class="float-right" type="text" placeholder="Search for everything ...">
            </form>
        </div>
    </section>
    <main>
        <div class="row">
            <div class="ten columns">
                <div class="calendar">
                    <div class="calendar-head">
                        <div class="row">
                            <div class="four columns">
                                <div class="calendar-left">
                                    <a href="#" class="fas fa-arrow-left"> </a>
                                </div>
                            </div>
                            <div class="four columns">
                                <h5 class="calendar-title">December <span class="calendar-year">2018</span></h5>
                            </div>
                            <div class="four columns">
                                <div class="calendar-right">
                                    <a href="#" class="fas fa-arrow-right"> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="calendar-body">
                        <div class="row">
                            <div class="day-column columns calendar-day">
                                <span>Mon</span>
                                <span class="gray">1</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span>Tue</span>
                                <span class="gray">2</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span>Wed</span>
                                <span class="gray">3</span>
                                <div class="calendar-event calendar-event-green">
                                    <span id="bold">* - *</span> Vrijaf
                                </div>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span>Thu</span>
                                <span class="gray">4</span>
                            </div>
                            <div class="day-column columns calendar-day ">
                                <span>Fri</span>
                                <span class="gray">5</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span>Sat</span>
                                <span class="gray">6</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span>Sun</span>
                                <span class="gray">7</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="day-column columns calendar-day">
                                <span class="gray">8</span>
                                <div class="calendar-event calendar-event-blue">
                                    <span id="bold">10u - 1u</span> Eten met mama
                                </div>
                                <div class="calendar-event calendar-event-red">
                                    <span id="bold">4u - 5u</span> Vergadering met Google
                                </div>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">9</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">10</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">11</span>
                            </div>
                            <div class="day-column columns calendar-day ">
                                <span class="gray">12</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">13</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">14</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="day-column columns calendar-day">
                                <span class="gray">15</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">16</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">17</span>
                                <div class="calendar-event calendar-event-red">
                                    <span id="bold">12u - 1u</span> Vergadering
                                </div>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">18</span>
                            </div>
                            <div class="day-column columns calendar-day ">
                                <span class="gray">19</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">20</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">21</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="day-column columns calendar-day">
                                <span class="gray">22</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">23</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">24</span>
                                <div class="calendar-event calendar-event-green">
                                    <span id="bold">* - *</span> Vrijaf
                                </div>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">25</span>
                            </div>
                            <div class="day-column columns calendar-day ">
                                <span class="gray">26</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">27</span>
                                <div class="calendar-event calendar-event-red">
                                    <span id="bold">12u - 1u</span> Vergadering
                                </div>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">28</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="day-column columns calendar-day">
                                <span class="gray">29</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">30</span>
                            </div>
                            <div class="day-column columns calendar-day">
                                <span class="gray">31</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="two columns">
                <button class="button button-primary no-button">New event</button>
            </div>
        </div>
    </main>
@endsection