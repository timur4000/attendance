@extends(admin_directory('layouts.app'))

@section('title', 'Dashboard | Attendance')

@section('content')

    <div class="grid-row margin-bottom-20">

        <div class="grid-column grid-column-6 grid-column--type-justify-start">

            <select name="id_unit" data-dashboard-custom-select="unit"></select>

            <select name="id_position" data-dashboard-custom-select="position"></select>

            <select name="id_category" data-dashboard-custom-select="category"></select>

        </div>

        <div class="grid-column grid-column-6 grid-column--type-justify-end">

            @include(admin_directory('admin.includes.forms.date'), [ 'data' => [ 'icon_id' => 'time-calendar-search', 'input_name' => 'date', 'input_type' => 'text', 'input_placeholder' => 'Date', 'with_error' => false, 'max_date' => date(\App\Standards\Classifiers\Date\DateFormatsClassifier::Y_m_d->value) ] ])

        </div>

    </div>

    <section class="statistic-cards grid-row" data-dashboard-statistic-cards></section>
    
    <section class="grid-row margin-top-30" data-dashboard-statistic-upper-charts></section>

    <section class="grid-row margin-top-30" data-dashboard-statistic-lower-charts></section>

    <template data-modal-template="latecomers-modal">

        <section class="table table--size-default table--theme-mercury" id="latecomers-modal-table"></section>

    </template>

    <template data-modal-template="arrived-on-time-modal">

        <section class="table table--size-default table--theme-mercury" id="arrived-on-time-modal-table"></section>

    </template>

    <template data-modal-template="absent-modal">

        <section class="table table--size-default table--theme-mercury" id="absent-modal-table"></section>

    </template>

    <template data-modal-template="users-by-hour-modal">

        <section class="table table--size-default table--theme-mercury" id="users-by-hour-modal-table"></section>

    </template>


    {{--    <section class="multiple-select multiple-select--size-default multiple-select--theme-default">--}}

    {{--        <div class="multiple-select-input">--}}

    {{--            <div class="multiple-select-input__values">--}}

    {{--                <div class="multiple-select-input__value">--}}

    {{--                    <span class="multiple-select-input__value-text">Watermelon</span>--}}

    {{--                    <div class="multiple-select-input__value-close">--}}
    {{--                        {!! svg('essential-close', [ 'class' => 'icon icon-size-8' ]) !!}--}}
    {{--                    </div>--}}

    {{--                </div>--}}

    {{--                <div class="multiple-select-input__value">--}}

    {{--                    Grapefruit--}}

    {{--                    <div class="multiple-select-input__value-close">--}}
    {{--                        {!! svg('essential-close', [ 'class' => 'icon icon-size-8' ]) !!}--}}
    {{--                    </div>--}}

    {{--                </div>--}}

    {{--            </div>--}}

    {{--        </div>--}}

    {{--    </section>--}}


    {{--            <div class="grid-column grid-column-9">--}}

{{--                <div class="card card--theme-white">--}}

{{--                    <div class="card-head card-head--size-default card-head--theme-jumbo">--}}

{{--                        <div class="grid-row">--}}

{{--                            <div class="grid-column grid-column--type-middle grid-column-">--}}
{{--                                <h3 class="card-heading card-heading--size-default card-heading--theme-jumbo">Time chart</h3>--}}
{{--                            </div>--}}

{{--                            <div class="grid-column grid-column--type-middle grid-column-6 grid-column--type-justify-end">--}}

{{--                            </div>--}}

{{--                        </div>--}}

{{--                    </div>--}}

{{--                    <div class="card-main card-main--size-default">--}}
{{--                        <div class="" id="chart" style="width: 100% !important;"></div>--}}
{{--                    </div>--}}

{{--                </div>--}}

{{--            </div>--}}

{{--        <script type="module">--}}

{{--            import { HttpRequest } from '/assets/js/tea-modules/Classes/Requests/HttpRequest.js';--}}

{{--            function getRandomArbitrary(min, max) {--}}
{{--                return Math.round(Math.random() * (max - min) + min);--}}
{{--            }--}}

{{--            (async function ()--}}
{{--            {--}}
{{--                const request = new HttpRequest(--}}
{{--                    {--}}
{{--                        url: '/assets/js/lib/apex-charts/locales/en.json',--}}
{{--                    });--}}

{{--                const data = await request.execute();--}}

{{--                var options = {--}}
{{--                    series: [{--}}
{{--                        name: 'series1',--}}
{{--                        data: [...Array(24).keys()].map(n => `${ getRandomArbitrary(-100, 100) }`),--}}
{{--                    }, {--}}
{{--                        name: 'series2',--}}
{{--                        data: [...Array(24).keys()].map(n => `${ getRandomArbitrary(-100, 100) }`),--}}
{{--                    }],--}}
{{--                    grid: {--}}
{{--                        position: 'front',--}}
{{--                        borderColor: '#E3E3E3',--}}
{{--                        strokeDashArray: 7,--}}
{{--                        row: {--}}
{{--                            // colors: ['#f8f8f8', 'transparent'],--}}
{{--                            // opacity: 0.5--}}
{{--                        },--}}
{{--                    },--}}
{{--                    chart: {--}}
{{--                        zoom: {--}}
{{--                            enabled: false--}}
{{--                        },--}}
{{--                        toolbar: {--}}
{{--                            show: false--}}
{{--                        },--}}
{{--                        locales: [ data ],--}}
{{--                        defaultLocale: "en",--}}
{{--                        width: '100%',--}}
{{--                        height: 300,--}}
{{--                        type: 'line',--}}
{{--                        events: {--}}
{{--                            click: function(event, chartContext, config) {--}}
{{--                                console.log(arguments);--}}
{{--                            }--}}
{{--                        }--}}
{{--                    },--}}
{{--                    colors: [ '#524cd6', '#8A2BE2', '#c2fad8', '#fed6bb'],--}}
{{--                    dataLabels: {--}}
{{--                        // enabled: true--}}
{{--                    },--}}
{{--                    annotations: {--}}
{{--                        yaxis: [{--}}
{{--                            y: 0,--}}
{{--                            borderColor: '#FF1493',--}}
{{--                            fillColor: '#FF1493',--}}
{{--                        }],--}}
{{--                    },--}}
{{--                    stroke: {--}}
{{--                        show: true,--}}
{{--                        curve: 'smooth',--}}
{{--                        lineCap: 'butt',--}}
{{--                        colors: undefined,--}}
{{--                        width: 3,--}}
{{--                        dashArray: 0,--}}
{{--                    },--}}
{{--                    // stroke: {--}}
{{--                    //     curve: 'smooth'--}}
{{--                    // },--}}
{{--                    yaxis:--}}
{{--                        {--}}
{{--                            max: 150,--}}
{{--                            min: -150,--}}
{{--                        },--}}
{{--                    xaxis: {--}}
{{--                        // type: 'datetime',--}}
{{--                        // min: 0,--}}
{{--                        // max: 1,--}}
{{--                        // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z", "2018-09-19T07:30:00.000Z", "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z", "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z", "2018-09-19T12:30:00.000Z", "2018-09-19T13:30:00.000Z", "2018-09-19T14:30:00.000Z"]--}}
{{--                        // categories: [...Array(30).keys()].map(n => n > 9 ? `2022-09-${n+1}` : `2022-09-0${n+1}`),--}}
{{--                        // categories: [...Array(24).keys()].map(n => n > 9 ? `2018-09-19T${n+1}:00:00.000Z` : `2022-09-0${n+1}`),--}}
{{--                        // categories: [...Array(24).keys()].map(n => `2018-09-23T${ (n).toString().padStart(2, '0') }:00:00.000Z`),--}}
{{--                        categories: [...Array(24).keys()].map(n => `${ (n).toString().padStart(2, '0') }`),--}}
{{--                    },--}}
{{--                    legend: {--}}
{{--                        show: false--}}
{{--                    },--}}
{{--                    // tooltip: {--}}
{{--                    //     x: {--}}
{{--                    //         format: () => 123,--}}
{{--                    //     },--}}
{{--                    // },--}}
{{--                    // theme: {--}}
{{--                    //     mode: 'light',--}}
{{--                    //     palette: 'palette10',--}}
{{--                    //     monochrome: {--}}
{{--                    //         enabled: false,--}}
{{--                    //         color: '#255aee',--}}
{{--                    //         shadeTo: 'light',--}}
{{--                    //         shadeIntensity: 0.65--}}
{{--                    //     },--}}
{{--                    // },--}}
{{--                };--}}

{{--                setTimeout(() =>--}}
{{--                {--}}
{{--                    var chart = new ApexCharts(document.querySelector("#chart"), options);--}}

{{--                    chart.render();--}}
{{--                }, 300);--}}

{{--                console.log(data);--}}
{{--            })();--}}
{{--        </script>--}}

{{--        <div class="grid-column grid-column-3">--}}

{{--            <div class="statistic-card card card--type-full-vertical card--theme-white">--}}

{{--                --}}{{--                <div class="card-head card-head--type-center card-head--theme-jumbo card-head--size-default">--}}

{{--                --}}{{--                    <h2 class="card-heading card-heading--theme-jumbo card-heading--size-default">Latecomers</h2>--}}

{{--                --}}{{--                </div>--}}

{{--                <div class="card-main card-main--size-default" id="chart-1">--}}

{{--                    <script>--}}

{{--                        var options = {--}}
{{--                            series: [15, 30],--}}
{{--                            chart: {--}}
{{--                                // height: '100%',--}}
{{--                                // width: 380,--}}
{{--                                type: 'donut',--}}
{{--                                // parentHeightOffset: 15,--}}
{{--                            },--}}
{{--                            labels: ['Latecomers', 'Arrived'],--}}
{{--                            dataLabels:--}}
{{--                                {--}}
{{--                                    // enabled: false,--}}
{{--                                },--}}
{{--                            legend: {--}}
{{--                                // show: false--}}
{{--                                position: 'bottom'--}}
{{--                            },--}}
{{--                            stroke: {--}}
{{--                                show: true,--}}
{{--                                // curve: 'smooth',--}}
{{--                                // lineCap: 'butt',--}}
{{--                                // colors: undefined,--}}
{{--                                width: 4,--}}
{{--                                // dashArray: 0,--}}
{{--                            },--}}
{{--                            tooltip:--}}
{{--                                {--}}
{{--                                    enabled: false,--}}
{{--                                },--}}
{{--                            plotOptions: {--}}
{{--                                pie: {--}}
{{--                                    donut: {--}}
{{--                                        size: '70%'--}}
{{--                                    }--}}
{{--                                }--}}
{{--                            },--}}
{{--                            colors: [ '#336699', '#524CD6'],--}}
{{--                            responsive: [{--}}
{{--                                breakpoint: 480,--}}
{{--                                options: {--}}
{{--                                    chart: {--}}
{{--                                        // width: 200--}}
{{--                                    },--}}
{{--                                    legend: {--}}
{{--                                        // show: false,--}}
{{--                                        position: 'bottom'--}}
{{--                                    }--}}
{{--                                }--}}
{{--                            }]--}}
{{--                        };--}}

{{--                        setTimeout(() =>--}}
{{--                        {--}}
{{--                            var chart = new ApexCharts(document.querySelector("#chart-1"), options);--}}
{{--                            chart.render();--}}
{{--                        }, 300);--}}

{{--                    </script>--}}

{{--                    --}}{{--                    <div class="grid-row">--}}

{{--                    --}}{{--                        <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">--}}

{{--                    --}}{{--                            <h3 class="statistic-card__heading statistic-card__heading--size-default">Latecomers</h3>--}}

{{--                    --}}{{--                            <div class="statistic-progress statistic-progress--theme-royal-blue statistic-progress--size-default">--}}

{{--                    --}}{{--                                <div class="statistic-progress__property statistic-progress__icon--size-default">--}}
{{--                    --}}{{--                                    <span data-first-value="c_total">6</span>/<span data-first-total="c_total">30</span>--}}
{{--                    --}}{{--                                </div>--}}

{{--                    --}}{{--                                <svg viewBox="0 0 120 120" class="statistic-progress__progress">--}}
{{--                    --}}{{--                                    <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer"></circle>--}}

{{--                    --}}{{--                                    <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" style="--statistic-progress-level: 20;"></circle>--}}
{{--                    --}}{{--                                </svg>--}}
{{--                    --}}{{--                            </div>--}}

{{--                    --}}{{--                        </div>--}}

{{--                    --}}{{--                        <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">--}}

{{--                    --}}{{--                            <h3 class="statistic-card__heading statistic-card__heading--size-default">Arrived</h3>--}}

{{--                    --}}{{--                            <div class="statistic-progress statistic-progress--theme-royal-blue statistic-progress--size-default">--}}

{{--                    --}}{{--                                <div class="statistic-progress__property">--}}
{{--                    --}}{{--                                    <span data-first-value="c_total">24</span>/<span data-first-total="c_total">30</span>--}}
{{--                    --}}{{--                                </div>--}}

{{--                    --}}{{--                                <svg viewBox="0 0 120 120" class="statistic-progress__progress">--}}
{{--                    --}}{{--                                    <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer"></circle>--}}

{{--                    --}}{{--                                    <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" style="--statistic-progress-level: 80;"></circle>--}}
{{--                    --}}{{--                                </svg>--}}
{{--                    --}}{{--                            </div>--}}

{{--                    --}}{{--                        </div>--}}

{{--                    --}}{{--                    </div>--}}

{{--                </div>--}}

{{--            </div>--}}

{{--        </div>--}}

{{--    @include('admin.includes.forms.default-input', [ 'data' => [ 'input_type' => 'input_name', 'input_name' => 'date', 'icon_id' => 'time-calendar-search"', 'input_placeholder' => 'Text', 'autocomplete' => false ] ])--}}

{{--    @include('admin.includes.forms.input', [ 'data' => [ 'input_type' => 'text', 'input_name' => 'input_name', 'icon_id' => 'time-calendar-search"', 'input_placeholder' => 'Text' ] ])--}}

{{--    <link rel="stylesheet" href="{{ asset('assets/js/lib/air-datepicker/air-datepicker.css') }}">--}}

{{--    <script src="{{ asset('assets/js/lib/air-datepicker/air-datepicker.js') }}"></script>--}}

{{--    <input type="text" id="input">--}}


{{--    <button class="button button--type-default button--theme-white-azure-wild-sand button--size-middle" data-modal-id="testing-call">Modal call</button>--}}

@endsection

{{--<section class="notification-item default nothing test" style="display: none;">--}}

{{--    <div class="notification-line upper">--}}

{{--        <div class="notification-column">--}}

{{--            <div class="notification-item__icon">--}}
{{--                {!! svg('essential-notification', [ 'class' => 'icon icon-size-20' ]) !!}--}}
{{--            </div>--}}

{{--            <div class="notification-item__heading">--}}
{{--                Lorem ipsum.--}}
{{--            </div>--}}

{{--        </div>--}}

{{--        <button type="button" class="notification-item__button">--}}
{{--            {!! svg('essential-close', [ 'class' => 'icon icon-size-10' ]) !!}--}}
{{--        </button>--}}

{{--    </div>--}}

{{--    <div class="notification-line lower">--}}

{{--        <div class="notification-item__paragraph">--}}
{{--            Lorem ipsum dolor sit amet, consectetur.--}}
{{--        </div>--}}

{{--    </div>--}}

{{--</section>--}}

{{--<template data-modal-template="testing-call">--}}
{{--    Forms--}}
{{--</template>--}}

{{--<div class="modal modal--theme-mercury modal--size-middle" style="display: none;">--}}

{{--    <div class="modal__wrapper">--}}

{{--        <div class="modal-card">--}}

{{--            <div class="modal-line single upper">--}}

{{--                <h2 class="modal-heading">--}}
{{--                    Payment form--}}
{{--                </h2>--}}

{{--            </div>--}}

{{--            <div class="modal-line middle">--}}
{{--                MIDDLE--}}
{{--            </div>--}}

{{--            <div class="modal-line double lower">--}}

{{--                <a href="#" class="button button--type-square button--size-middle button--theme-white-azure-bittersweet" onclick="return confirm();" data-clue="Cancel">--}}
{{--                    {!! svg('essential-close', [ 'class' => 'icon icon-size-10' ]) !!}--}}
{{--                </a>--}}


{{--                <a href="#" class="button button--type-square button--size-middle button--theme-white-azure-wild-sand margin-right-10" data-clue="Confirm">--}}
{{--                    {!! svg('essential-check', [ 'class' => 'icon icon-size-12' ]) !!}--}}
{{--                </a>--}}

{{--            </div>--}}

{{--        </div>--}}

{{--    </div>--}}

{{--</div>--}}


{{--    <section class="table table--size-default table--theme-mercury margin-top-60" style="display: none;">--}}

{{--        <div class="table-line columns">--}}

{{--            <div class="table-line__column">--}}

{{--                <select name="per-page" data-custom-select data-with-search="0" data-placeholder="Per page" data-with-label="1">--}}
{{--                    <option value="0" selected>10</option>--}}
{{--                    <option value="1">20</option>--}}
{{--                    <option value="2">30</option>--}}
{{--                    <option value="3">40</option>--}}
{{--                </select>--}}

{{--                <div class="input-outer input-outer--theme-mercury input-outer--size-middle">--}}

{{--                    <input type="text" name=123 class="input input--theme input--size-middle input-outer__input custom-input__input" placeholder="Search.." id=123>--}}

{{--                    <label for=123 class="input-outer__label input-outer__label--size-middle input-outer__label--theme">--}}
{{--                        {!! svg('user-profiles', [ 'class' => 'icon icon-size-16' ]) !!}--}}
{{--                    </label>--}}

{{--                </div>--}}

{{--            </div>--}}

{{--            <div class="table-line__column"><select name="per-page" data-custom-select data-with-search="0" data-placeholder="Per page" data-with-label="1">--}}
{{--                    <option value="0" selected>10</option>--}}
{{--                    <option value="1">20</option>--}}
{{--                    <option value="2">30</option>--}}
{{--                    <option value="3">40</option>--}}
{{--                </select><select name="per-page" data-custom-select data-with-search="0" data-placeholder="Per page  asd asd as d" data-with-label="1">--}}
{{--                    <option value="0" selected>10</option>--}}
{{--                    <option value="1">20</option>--}}
{{--                    <option value="2">30</option>--}}
{{--                    <option value="3">40</option>--}}
{{--                </select><select name="per-page" data-custom-select data-with-search="0" data-placeholder="Per page" data-with-label="1">--}}
{{--                    <option value="0" selected>10</option>--}}
{{--                    <option value="1">20</option>--}}
{{--                    <option value="2">30</option>--}}
{{--                    <option value="3">40</option>--}}
{{--                </select><select name="per-page" data-custom-select data-with-search="0" data-placeholder="Per page" data-with-label="1">--}}
{{--                    <option value="0" selected>10</option>--}}
{{--                    <option value="1">20</option>--}}
{{--                    <option value="2">30</option>--}}
{{--                    <option value="3">40</option>--}}
{{--                </select></div>--}}

{{--        </div>--}}


{{--        <div class="table-line table">--}}

{{--            <table class="table-element collapse">--}}

{{--                <thead class="table-element__head">--}}

{{--                <tr class="table-element__row table-element__row--type-head">--}}

{{--                    <th class="table-element__cell number head sortable sort-asc">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">ID</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell string head sortable">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">First name</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell string head sortable">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">Last name</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell string head sortable">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">Is active</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell string head sortable">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">Status</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell number head sortable">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-value">Points</div>--}}

{{--                            <div class="table-element__cell-icon">ICON</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                    <th class="table-element__cell action head">--}}

{{--                        <div class="table-element__cell-inner">--}}

{{--                            <div class="table-element__cell-icon">{!! svg('settings-gear', [ 'class' => 'icon icon-size-16' ]) !!}</div>--}}

{{--                        </div>--}}

{{--                    </th>--}}

{{--                </tr>--}}

{{--                </thead>--}}

{{--                <tbody class="table-element__body">--}}

{{--                <tr class="table-element__row body">--}}

{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell boolean body">--}}

{{--                        <span class="table-label table-label--type-text success">{!! svg('essential-check', [ 'class' => 'icon icon-size-10' ]) !!}</span>--}}

{{--                    </td>--}}
{{--                    <td class="table-element__cell status body">--}}
{{--                        <span class="table-label table-label--type-text success">ENABLE</span>--}}
{{--                    </td>--}}
{{--                    <td class="table-element__cell number body">09875</td>--}}
{{--                    <td class="table-element__cell action body">--}}
{{--                        <div class="table-element__cell-inner">--}}

{{--                            <a href="#" class="table-button default">{!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button default disabled">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button alert disabled">{!! svg('essential-trash', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}

{{--                        </div>--}}
{{--                    </td>--}}

{{--                </tr>--}}

{{--                <tr class="table-element__row body">--}}

{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell boolean body">--}}

{{--                        <span class="table-label table-label--type-text success">{!! svg('essential-check', [ 'class' => 'icon icon-size-10' ]) !!}</span>--}}

{{--                    </td>--}}
{{--                    <td class="table-element__cell status body">--}}
{{--                        <span class="table-label table-label--type-text success">ENABLE</span>--}}
{{--                    </td>--}}
{{--                    <td class="table-element__cell number body">09875</td>--}}
{{--                    <td class="table-element__cell action body">--}}
{{--                        <div class="table-element__cell-inner">--}}

{{--                            <a href="#" class="table-button default">{!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button default disabled">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button alert disabled">{!! svg('essential-trash', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}

{{--                        </div>--}}
{{--                    </td>--}}

{{--                </tr>--}}

{{--                <tr class="table-element__row body">--}}

{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell boolean body">--}}

{{--                        <span class="table-label table-label--type-text success">{!! svg('essential-check', [ 'class' => 'icon icon-size-10' ]) !!}</span>--}}

{{--                    </td>--}}
{{--                    <td class="table-element__cell status body">--}}
{{--                        <span class="table-label table-label--type-text alert">DISABLE</span>--}}
{{--                    </td>--}}
{{--                    <td class="table-element__cell number body">09875</td>--}}
{{--                    <td class="table-element__cell action body">--}}
{{--                        <div class="table-element__cell-inner">--}}

{{--                            <a href="#" class="table-button default">{!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button default disabled">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button alert disabled">{!! svg('essential-trash', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}

{{--                        </div>--}}
{{--                    </td>--}}

{{--                </tr>--}}

{{--                <tr class="table-element__row body">--}}

{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell boolean body">--}}

{{--                        <span class="table-label table-label--type-text alert">{!! svg('essential-close', [ 'class' => 'icon icon-size-10' ]) !!}</span>--}}

{{--                    </td>--}}
{{--                    <td class="table-element__cell status body">--}}
{{--                        <span class="table-label table-label--type-text success">ENABLE</span>--}}
{{--                    </td>--}}
{{--                    <td class="table-element__cell number body">09875</td>--}}
{{--                    <td class="table-element__cell action body">--}}
{{--                        <div class="table-element__cell-inner">--}}

{{--                            <a href="#" class="table-button default">{!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button default disabled">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button alert disabled">{!! svg('essential-trash', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}

{{--                        </div>--}}
{{--                    </td>--}}

{{--                </tr>--}}

{{--                <tr class="table-element__row body">--}}

{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell string body">Lorem ipsum.</td>--}}
{{--                    <td class="table-element__cell boolean body">--}}

{{--                        <span class="table-label table-label--type-text success">{!! svg('essential-check', [ 'class' => 'icon icon-size-10' ]) !!}</span>--}}

{{--                    </td>--}}
{{--                    <td class="table-element__cell status body">--}}
{{--                        <span class="table-label table-label--type-text success">ENABLE</span>--}}
{{--                    </td>--}}
{{--                    <td class="table-element__cell number body">09875</td>--}}
{{--                    <td class="table-element__cell action body">--}}
{{--                        <div class="table-element__cell-inner">--}}

{{--                            <a href="#" class="table-button default">{!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button default disabled">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}
{{--                            <a href="#" class="table-button alert">{!! svg('essential-trash', [ 'class' => 'icon icon-size-16' ]) !!}</a>--}}

{{--                        </div>--}}
{{--                    </td>--}}

{{--                </tr>--}}

{{--                </tbody>--}}

{{--            </table>--}}

{{--        </div>--}}


{{--        <div class="table-line columns">--}}

{{--            <div class="table-line__column">--}}

{{--                <div class="table-text">Show: 1 / 5</div>--}}

{{--                <div class="table-text">Total: 5</div>--}}

{{--            </div>--}}

{{--            <div class="table-line__column">--}}

{{--                <ul class="table-pagination">--}}

{{--                    <li class="table-pagination__item disabled">--}}

{{--                        <a href="#" class="table-pagination__link">--}}
{{--                            {!! svg('arrows-long-left', [ 'class' => 'icon icon-size-10' ]) !!}--}}
{{--                        </a>--}}

{{--                    </li>--}}

{{--                    <li class="table-pagination__item active">--}}

{{--                        <a href="#" class="table-pagination__link">--}}
{{--                            1--}}
{{--                        </a>--}}

{{--                    </li>--}}

{{--                    <li class="table-pagination__item">--}}

{{--                        <a href="#" class="table-pagination__link">--}}
{{--                            2--}}
{{--                        </a>--}}

{{--                    </li>--}}

{{--                    <li class="table-pagination__item">--}}

{{--                        <a href="#" class="table-pagination__link">--}}
{{--                            3--}}
{{--                        </a>--}}

{{--                    </li>--}}

{{--                    <li class="table-pagination__item">--}}

{{--                        <a href="#" class="table-pagination__link">--}}
{{--                            {!! svg('arrows-long-right', [ 'class' => 'icon icon-size-10' ]) !!}--}}
{{--                        </a>--}}

{{--                    </li>--}}

{{--                </ul>--}}

{{--            </div>--}}

{{--        </div>--}}

{{--    </section>--}}

{{--    <section class="table table--size-default table--theme-mercury" id="table"--}}
{{--             data-url="{{ route(\App\Standards\Abstracts\RouteGroup\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Unit\UnitListJsonPostRouteRequest::class)) }}"></section>--}}